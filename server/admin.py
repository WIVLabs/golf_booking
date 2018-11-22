from django.contrib import admin
from .models import Site, GolfCourse


@admin.register(Site)
class SiteAdmin(admin.ModelAdmin):
    pass


@admin.register(GolfCourse)
class GolfCourseAdmin(admin.ModelAdmin):
    pass
