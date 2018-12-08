from django.db import models
from rest_framework import serializers
from .enums import Status, Region
from .site import Site


class GolfCourse(models.Model):
    name = models.CharField(max_length=30, unique=True)
    disp_name = models.CharField(max_length=30, blank=False)
    address = models.CharField(max_length=50, blank=True, default='')
    region = models.CharField(max_length=2,
                              choices=Region.choices(),
                              default='R0',
                              db_index=True)
    url = models.URLField(blank=True, default='')
    status = models.CharField(max_length=1,
                              choices=Status.choices(),
                              default=Status.A.value,
                              db_index=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '{} {}'.format(self.region, self.name)

    class Meta:
        db_table = 'golf_course'
        ordering = ['name']


class GolfCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = GolfCourse
        exclude = ()


class GolfCourseMapper(models.Model):
    golf_course = models.ForeignKey(GolfCourse, on_delete=models.CASCADE, db_index=True)
    site = models.ForeignKey(Site, on_delete=models.CASCADE)
    pk_in_site = models.CharField(max_length=10, blank=False)
    info_url = models.URLField(blank=True, default='')
    booking_url = models.URLField(blank=True, default='')
    status = models.CharField(max_length=1,
                              choices=Status.choices(),
                              default=Status.A.value,
                              db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '{:>10} {:>10} ({:>10})'.format(self.site, self.key, self.golf_course)

    class Meta:
        db_table = 'golf_course_mapper'
        unique_together = (('site', 'pk_in_site'),)


class GolfCourseMapperSerializer(serializers.ModelSerializer):
    class Meta:
        model = GolfCourseMapper
        exclude = ()
