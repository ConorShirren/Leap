from django.db import models
from datetime import datetime    

class Indicator(models.Model):
    indicator = models.CharField(max_length=65, blank=False, default='')
    limit = models.CharField(max_length=255, blank=False, default='')
    interval = models.CharField(max_length=255, blank=False, default='')
    period = models.IntegerField(default=14)
    symbol = models.CharField(max_length=255, blank=False, default='')