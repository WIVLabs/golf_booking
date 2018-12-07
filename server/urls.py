from server import views
from django.urls import path, include

urlpatterns = [
    path('', views.index, name='index'),
    path('api/', include('server.api.urls', namespace='api'))
]
