from django.contrib import admin
from .models import Site, GolfCourse, GolfCourseMapper, Booking, BookingSummary


@admin.register(Site)
class SiteAdmin(admin.ModelAdmin):
    pass


@admin.register(GolfCourse)
class GolfCourseAdmin(admin.ModelAdmin):
    pass


@admin.register(GolfCourseMapper)
class GolfCourseMapperAdmin(admin.ModelAdmin):
    pass


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    pass


@admin.register(BookingSummary)
class BookingSummaryAdmin(admin.ModelAdmin):
    pass
