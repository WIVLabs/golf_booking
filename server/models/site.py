from django.db import models
from rest_framework import serializers
from .enums import Status


class Site(models.Model):
    name = models.CharField(max_length=30, blank=False)
    url = models.URLField(blank=False)
    icon_url = models.URLField(blank=False)
    status = models.CharField(max_length=1,
                              choices=Status.choices(),
                              default=Status.A.value,
                              db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'site'


class SiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Site
        fields = ('id', 'name', 'url', 'icon_url', 'status')

