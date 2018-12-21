from server.api import views
from django.urls import path, include

app_name = 'api'
urlpatterns = [
    path('site', views.SiteList.as_view(), name='site'),
    path('regions', views.regions, name='regions'),
    path('golf-courses', views.GolfCourseList.as_view(), name='golf-courses'),
    path('golf-course-mapper', views.GolfCourseMapperList.as_view(), name='golf-course-mapper'),
    path('bookings', views.BookingList.as_view(), name='bookings'),
    path('bookings2', views.Bookings.as_view(), name='bookings2'),
    path('bookings3', views.BookingsUsingPaginator.as_view(), name='bookings-paginator')
]
