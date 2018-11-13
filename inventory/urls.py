from django.urls import path

from inventory import views

urlpatterns = [
    path(r'index/', views.index),
]
