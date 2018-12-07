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

from ddict import DotAccessDict

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def bookings2(request):
    print(request.query_params.keys())

    for _key in request.query_params.keys():
        print('_key:', _key)

    query = DotAccessDict(request.query_params)
    print('query:', query)
    return Response([{'id': _id, 'name': _name} for _id, _name in Region.choices() if _id != 'R0'])
