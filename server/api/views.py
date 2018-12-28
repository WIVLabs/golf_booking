import re
from json import loads
from pprint import pprint
from ddict import DotAccessDict
from collections import defaultdict
from django.core.paginator import Paginator
from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from server.models import Site, SiteSerializer
from server.models import GolfCourse, GolfCourseSerializer
from server.models import GolfCourseMapper, GolfCourseMapperSerializer
from server.models import Booking, BookingSerializer
from server.models.enums import Region


class SiteList(generics.ListCreateAPIView):
    serializer_class = SiteSerializer
    filter_opts = ['status']

    def get_queryset(self):
        filtering = {_key: _value for _key, _value in self.request.query_params.items() if _key in self.filter_opts}
        return Site.objects.filter(**filtering)


@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def regions(request):
    return Response([{'id': _id, 'name': _name} for _id, _name in Region.choices() if _id != 'R0'])


class GolfCourseList(generics.ListCreateAPIView):
    serializer_class = GolfCourseSerializer
    filter_opts = ['status', 'region']

    def get_queryset(self):
        filtering = {_key: _value for _key, _value in self.request.query_params.items() if _key in self.filter_opts}
        if 'status' not in filtering:
            filtering['status'] = 'A'
        return GolfCourse.objects.filter(**filtering)


class GolfCourseMapperList(generics.ListCreateAPIView):
    serializer_class = GolfCourseMapperSerializer
    filter_opts = ['status', 'site']

    def get_queryset(self):
        filtering = {_key: _value for _key, _value in self.request.query_params.items() if _key in self.filter_opts}
        if 'status' not in filtering:
            filtering['status'] = 'A'
        return GolfCourseMapper.objects.filter(**filtering)


class BookingList(generics.ListCreateAPIView, generics.RetrieveDestroyAPIView):
    serializer_class = BookingSerializer
    filter_opts = ['golf_course', 'site', 'kickoff_date']

    def get_queryset(self):
        filtering = {_key: _value for _key, _value in self.request.query_params.items() if _key in self.filter_opts}
        return Booking.objects.filter(**filtering)

    def destroy(self, request, *args, **kwargs):
        deleted_items = []
        for _instance in self.get_queryset():
            deleted_items.append({'id': _instance.id})
            self.perform_destroy(_instance)
        return Response(deleted_items, status=status.HTTP_204_NO_CONTENT)

    def get_serializer(self, instance=None, data=None, many=False, partial=False):
        return super(BookingList, self).get_serializer(instance=instance,
                                                       data=data,
                                                       many=isinstance(data, list),
                                                       partial=partial)


class BookingsUsingPaginator(APIView):
    R_NONDIGIT = re.compile('[^\d]+')

    def get(self, request):
        def trans_address(_addr):
            return _addr and ' '.join(_addr.split(' ', 3)[:2]).strip() or ''

        def trans_bookings(_bookings):
            data = []
            sites = {_id: _name for _id, _name in Site.objects.all().values_list('id', 'name')}
            for _bk in _bookings.values():
                _bk['site_name'] = sites[_bk['site_id']]
                data.append(_bk)
            return data

        def get_response_course_data(courses, kickoff_dates, booking_list):
            course_data = []
            for _course in courses:
                kickoffs = self.grouping(_course.id, kickoff_dates, booking_list)
                if kickoffs:
                    course_data.append({
                        'id': _course.id,
                        'name': _course.disp_name,
                        'address': trans_address(_course.address),
                        'kickoffs': kickoffs
                    })
            return course_data

        query = DotAccessDict(loads(request.query_params.get('params', '{}')))
        page = int(query.get('page', 1))

        paging_courses = self.get_paging_courses(query)
        courses = paging_courses.get_page(page)
        bookings = self.get_bookings(query, list(map(lambda _c: _c.id, courses)))

        kickoff_dates = sorted(list(map(lambda x: self.R_NONDIGIT.subn('', x)[0], query.booking_dates)))
        booking_list = trans_bookings(bookings)

        return Response({
            'kickoff_dates': kickoff_dates,
            'courses': get_response_course_data(courses, kickoff_dates, booking_list),
            'cursor': {
                'max_courses': paging_courses.count,
                'has_next': courses.has_next(),
                'has_previous': courses.has_previous(),
                'next_page_number': courses.has_next() and courses.next_page_number() or None,
                'previous_page_number': courses.has_previous() and courses.previous_page_number() or None
            }
        })

    def grouping(self, golf_course_id, kickoff_dates, booking_list):
        def groupby(items, key):
            grouped = defaultdict(list)
            for _item in items:
                grouped[_item[key]].append(_item)
            return grouped

        def get_unique(items, key, func=None):
            return sorted(set([func and func(_item[key]) or _item[key] for _item in items if _item[key]]))

        def get_price(items):
            prices = get_unique(items, 'price')
            return {
                'min': prices[0],
                'max': prices[-1],
                'is_same': prices[0] == prices[-1]
            }

        kickoffs = []

        data = list(filter(lambda _bk: golf_course_id == _bk['golf_course_id'], booking_list))
        if data:
            gr_date = groupby(data, 'kickoff_date')
            date_keys = gr_date.keys()
            for _date in kickoff_dates:
                kickoff_hours = []
                if _date in date_keys:
                    gr_hour = groupby(gr_date[_date], 'kickoff_hour')
                    for _hour in sorted(gr_hour.keys()):
                        gr_site = groupby(gr_hour[_hour], 'site_id')
                        sites = []
                        for _site_id in sorted(gr_site.keys()):
                            _items = gr_site[_site_id]
                            if golf_course_id == 56 and _date == '20181222' and _hour == '09':
                                print(_site_id, '-'*100)
                                pprint(_items)
                            sites.append({
                                'id': _site_id,
                                'name': _items[0]['site_name'],
                                'teams': len(_items),
                                'notes': get_unique(_items, 'notes', lambda x: x.upper()),
                                'price': get_price(_items),
                                'url': _items[0]['url'],
                                'updated_at': _items[0]['updated_at']
                            })
                        kickoff_hours.append({
                            'kickoff_date': _date,
                            'kickoff_hour': _hour,
                            'sites': sites
                        })
                kickoffs.append(kickoff_hours)
        return kickoffs

    def get_paging_courses(self, query, limit=20):
        filtering = self.extract_filtering_opts_about_course(query)
        courses = GolfCourse.objects.filter(**filtering)
        return Paginator(courses, limit)

    def extract_filtering_opts_about_course(self, query):
        opts_region = lambda: query.region and {'region': query.region} or {}
        opts_course = lambda: query.course and {'id': int(query.course)} or {}
        opts_status = lambda: query.status and {'status': query.status} or {}

        filtering = {}
        filtering.update(**opts_region())
        filtering.update(**opts_course())
        filtering.update(**opts_status())
        return filtering

    def get_bookings(self, query, course_ids):
        filtering = self.extract_filtering_opts_about_booking(query, course_ids)
        return Booking.objects.filter(**filtering)

    def extract_filtering_opts_about_booking(self, query, course_ids):
        def opts_course():
            return course_ids and {'golf_course__in': course_ids} or {}

        def opts_date():
            return query.booking_dates \
                   and {'kickoff_date__in': list(map(lambda x: self.R_NONDIGIT.subn('', x)[0], query.booking_dates))} \
                   or {}

        def opts_time():
            str_zfill = lambda x: str(x).zfill(2)
            return query.time_range \
                   and {'kickoff_hour__gte': str_zfill(query.time_range['from']),
                        'kickoff_hour__lte': str_zfill(query.time_range['to'])} \
                   or {}

        def opts_price():
            return query.greenfee_range \
                   and {'price__gte': int(query.greenfee_range['from']), 'price__lte': int(query.greenfee_range['to'])} \
                   or {}

        filtering = {}
        filtering.update(**opts_course())
        filtering.update(**opts_date())
        filtering.update(**opts_time())
        filtering.update(**opts_price())
        return filtering

