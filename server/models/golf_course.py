from django.db import models
from .enums import Status, Region


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
        return self.name

    class Meta:
        db_table = 'golf_course'
