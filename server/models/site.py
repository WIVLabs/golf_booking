from django.db import models
from .enums import Status


class Site(models.Model):
    name = models.CharField(max_length=30, blank=False)
    url = models.URLField(blank=False)
    icon_url = models.URLField(blank=False)
    status = models.CharField(max_length=1,
                              choices=Status.choices(),
                              default=Status.A.value,
                              db_index=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'site'
