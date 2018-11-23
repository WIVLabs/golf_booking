from django.db import models
from .enums import Status, Region
from .site import Site


class GolfCourse(models.Model):
    name = models.CharField(max_length=30, unique=True)
    disp_name = models.CharField(max_length=30, blank=False)
    address = models.CharField(max_length=50, default='')
    region = models.CharField(max_length=2,
                              choices=Region.choices(),
                              default=Region.R0.value,
                              db_index=True)
    url = models.URLField(default='')
    status = models.CharField(max_length=1,
                              choices=Status.choices(),
                              default=Status.A.value,
                              db_index=True)

    def __str__(self):
        return '{} {}'.format(self.region, self.name)

    class Meta:
        db_table = 'golf_course'


class GolfCourseMapper(models.Model):
    golf_course = models.ForeignKey(GolfCourse, on_delete=models.CASCADE, db_index=True)
    site = models.ForeignKey(Site, on_delete=models.CASCADE)
    key = models.CharField(max_length=10, blank=False)
    status = models.CharField(max_length=1,
                              choices=Status.choices(),
                              default=Status.A.value,
                              db_index=True)

    def __str__(self):
        return '{:>10} {:>10} ({:>10})'.format(self.site, self.key, self.golf_course)

    class Meta:
        db_table = 'golf_course_mapper'
        unique_together = (('site', 'key'),)
