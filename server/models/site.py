from django.db import models
from .enums import Status, get_choices


class Site(models.Model):
    name = models.CharField('사이트명',
                            max_length=30,
                            blank=False)
    url = models.URLField('URL',
                          blank=False)
    status = models.CharField('상태',
                              max_length=1,
                              choices=get_choices(Status),
                              default=Status.A.value,
                              db_index=True)

    class Meta:
        db_table = 'site'
