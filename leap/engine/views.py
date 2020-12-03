from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status
import requests
from datetime import datetime
# Import DatasetUtils
from .utils import datasetutils as utils
# Create your views here.
from .serializers import IndicatorSerializer


class IndicatorView(GenericAPIView):
    serializer_class = IndicatorSerializer

    def get(self, request):
        serializer = IndicatorSerializer(data=request.data)
        if serializer.is_valid():
            print('true')
        period = int(request.GET.get('period'))
        symbol = request.GET.get('symbol')
        limit = request.GET.get('limit')
        interval = request.GET.get('interval')
        indicator = request.GET.get('indicator')
        data_set_utils = utils.DataSetUtils(interval, limit, period, symbol)
        data = data_set_utils.get_indicator(indicator)
        return Response(data, status=status.HTTP_201_CREATED)

