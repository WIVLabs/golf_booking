from django.db import models
from rest_framework import serializers
from .site import Site
from .golf_course import GolfCourse


class Booking(models.Model):
    golf_course = models.ForeignKey(GolfCourse, on_delete=models.CASCADE)
    site = models.ForeignKey(Site, on_delete=models.CASCADE)
    kickoff_date = models.CharField(max_length=8, blank=False)
    kickoff_hour = models.CharField(max_length=2, blank=False)
    kickoff_time = models.DateTimeField(blank=False)
    price = models.IntegerField(default=-1)
    notes = models.CharField(max_length=20, default='')
    url = models.URLField(blank=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'booking'
        unique_together = (('golf_course', 'site', 'kickoff_time'),)
        index_together = [['golf_course', 'kickoff_date'], ]


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        exclude = ()


class BookingSummary(models.Model):
    golf_course = models.ForeignKey(GolfCourse, on_delete=models.CASCADE)
    site = models.ForeignKey(Site, on_delete=models.CASCADE)
    kickoff_date = models.CharField(max_length=8, blank=False, db_index=True)
    kickoff_hour = models.CharField(max_length=2, blank=False)
    count = models.IntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'booking_summary'
        unique_together = (('golf_course', 'site', 'kickoff_date', 'kickoff_hour'),)
        index_together = [['golf_course', 'kickoff_date'], ]


class BookingSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingSummary
        exclude = ()

