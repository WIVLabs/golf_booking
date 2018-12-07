import re
from json import loads
from pprint import pprint
from ddict import DotAccessDict
from collections import defaultdict
from rest_framework.views import APIView
from gcrawler.utils.date import convert_str_to_weekday
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from server.models.enums import Region
from server.models import Site, SiteSerializer
from server.models import GolfCourse, GolfCourseSerializer
from server.models import GolfCourseMapper, GolfCourseMapperSerializer
from server.models import Booking, BookingSerializer


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
        return GolfCourse.objects.filter(**filtering)


class GolfCourseMapperList(generics.ListCreateAPIView):
    serializer_class = GolfCourseMapperSerializer
    filter_opts = ['status']

    def get_queryset(self):
        filtering = {_key: _value for _key, _value in self.request.query_params.items() if _key in self.filter_opts}
        return GolfCourseMapper.objects.filter(**filtering)


class BookingList(generics.ListCreateAPIView, generics.RetrieveDestroyAPIView):
    serializer_class = BookingSerializer

    def get_queryset(self):
        filtering = {_key: _value for _key, _value in self.request.query_params.items()}
        return Booking.objects.filter(**filtering)


class Bookings(APIView):
    R_NONDIGIT = re.compile('[^\d]+')

    def get(self, request):
        query = DotAccessDict(loads(request.query_params.get('params', '{}')))
        filtering = self.extract_filtering_opts(query)

        def get_dates():
            return sorted(filtering.get('kickoff_date__in', []))

        def get_bookings():
            bookings = defaultdict(list)
            for _booking in Booking.objects.filter(**filtering):
                bookings[(_booking.golf_course.name, _booking.golf_course.id)].append(_booking)
            return bookings

        def get_kickoffs(dates, bookings):
            items = defaultdict(list)
            for _item in bookings:
                items[_item.kickoff_date].append({
                    'id': _item.site.id,
                    'name': _item.site.name,
                    'icon_url': _item.site.icon_url,
                    'kickoff_time': _item.kickoff_time.strftime('%Y.%m.%d %H:%M'),
                    'price': _item.price,
                    'booking_url': _item.url,
                    'notes': _item.notes,
                })

            kickoffs = []
            for _date in dates:
                kickoffs.append({
                    'kickoff_date': _date,
                    'sites': items.get(_date, [])
                })
            return kickoffs

        dates = get_dates()

        courses = []
        bookings = get_bookings()
        for (_name, _id) in sorted(bookings.keys()):
            courses.append({
                'id': _id,
                'name': _name,
                'kickoffs': get_kickoffs(dates, bookings[(_name, _id)])
            })

        return Response({
            'kickoff_dates': [{'date': _d, 'weekday': convert_str_to_weekday(_d)} for _d in dates],
            'courses': courses,
        })

    def extract_filtering_opts(self, query):
        def parse_date():
            return query.booking_dates \
                   and {'kickoff_date__in': list(map(lambda x: self.R_NONDIGIT.subn('', x)[0], query.booking_dates))} \
                   or {}

        def parse_time():
            str_zfill = lambda x: str(x).zfill(2)
            return query.time_range \
                   and {'kickoff_hour__gte': str_zfill(query.time_range['from']),
                        'kickoff_hour__lte': str_zfill(query.time_range['to'])} \
                   or {}

        def parse_region():
            return query.region \
                   and {'golf_course__region': query.region} \
                   or {}

        def parse_course():
            return query.course \
                   and {'golf_course__id': int(query.course)} \
                   or {}

        def parse_price():
            return query.greenfee_range \
                   and {'price__gte': int(query.greenfee_range['from']), 'price__lte': int(query.greenfee_range['to'])} \
                   or {}

        filtering = {}
        filtering.update(**parse_date())
        filtering.update(**parse_time())
        filtering.update(**parse_region())
        filtering.update(**parse_course())
        filtering.update(**parse_price())

        print('-' * 20)
        print('query:', query)
        pprint(filtering)

        return filtering
