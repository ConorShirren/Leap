from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status
import requests
from datetime import datetime
# Import DatasetUtils
from .utils import datasetutils as utils
from .utils import api as _api
# Create your views here.
from .serializers import IndicatorSerializer



class IndicatorView(GenericAPIView):
    serializer_class = IndicatorSerializer

    def get(self, request):
        ## Get the tokens from file to connect to Strava
        stravaApi = _api.StravaApi()
        data = stravaApi.GetActivities()
        return Response(data, status=status.HTTP_201_CREATED)

