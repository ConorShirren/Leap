from rest_framework import serializers
from engine.models import Indicator

class IndicatorSerializer(serializers.ModelSerializer):
    indicator = serializers.CharField(max_length=65, min_length=2)
    limit = serializers.CharField(max_length=255, min_length=2)
    interval = serializers.CharField(max_length=255, min_length=2)
    period = serializers.IntegerField(default=14)
    symbol = serializers.CharField(max_length=255, min_length=2)

    class Meta:
        model = Indicator
        fields = ['indicator', 'limit', 'interval', 'period', 'symbol']