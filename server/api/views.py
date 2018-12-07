import re
from json import loads
from pprint import pprint
from ddict import DotAccessDict
from collections import defaultdict
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
    queryset = Site.objects.filter(status='A')
    serializer_class = SiteSerializer
    lookup_field = 'status'


@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def regions(request):
    return Response([{'id': _id, 'name': _name} for _id, _name in Region.choices() if _id != 'R0'])


class GolfCourseList(generics.ListCreateAPIView):
    queryset = GolfCourse.objects.filter(status='A')
    serializer_class = GolfCourseSerializer
    lookup_field = 'region'


class GolfCourseMapperList(generics.ListCreateAPIView):
    queryset = GolfCourseMapper.objects.filter(status='A')
    serializer_class = GolfCourseMapperSerializer


class BookingList(generics.ListCreateAPIView, generics.RetrieveDestroyAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    lookup_field = 'golf_course'


R_NONDIGIT = re.compile('[^\d]+')
@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def bookings2(request):
    query = DotAccessDict(loads(request.query_params.get('params', '{}')))

    def parse_date():
        return query.booking_dates \
               and {'kickoff_date__in': list(map(lambda x: R_NONDIGIT.subn('', x)[0], query.booking_dates))} \
               or {}

    def parse_time():
        str_zfill = lambda x: str(x).zfill(2)
        return query.time_range \
               and {'kickoff_hour__gte': str_zfill(query.time_range['from']), 'kickoff_hour__lte': str_zfill(query.time_range['to'])} \
               or {}

    def parse_region():
        return query.region \
               and {'golf_course__region': query.region} \
               or {}

    def parse_course():
        return query.course \
               and {'golf_course__id': query.course} \
               or {}

    def parse_price():
        return query.greenfee_range \
               and {'price__gte': int(query.greenfee_range['from']), 'price__lte': int(query.greenfee_range['to'])} \
               or {}

    def get_kickoffs(dates, bookings):
        items = defaultdict(list)
        for _item in bookings:
            items[_item.kickoff_date].append({
                'id': _item.site.id,
                'name': _item.site.name,
                'icon_url': _item.site.icon_url,
                'kickoff_time': _item.kickoff_time.strftime('%Y.%m.%d %H:%M'),
            })

        kickoffs = []
        for _date in dates:
            kickoffs.append({
                'kickoff_date': _date,
                'sites': items.get(_date, [])
            })
        return kickoffs


    print('query:', query)
    filtering = {}
    filtering.update(**parse_date())
    filtering.update(**parse_time())
    filtering.update(**parse_region())
    filtering.update(**parse_course())
    filtering.update(**parse_price())
    print('filtering::: {}'.format('-'*20))
    pprint(filtering)

    dates = sorted(filtering.get('kickoff_date__in', []))
    bookings = defaultdict(list)
    for _booking in Booking.objects.filter(**filtering):
        bookings[(_booking.golf_course.name, _booking.golf_course.id)].append(_booking)

    courses = []
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
