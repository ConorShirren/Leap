from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status
import requests
from datetime import datetime
# Import DatasetUtils
from .utils import kpm as _kpm
from .utils import api as _api
# Create your views here.
from .serializers import IndicatorSerializer, AuthenticationSerializer



class ActivitiesView(GenericAPIView):
    serializer_class = IndicatorSerializer

    def get(self, request):
        ## Get the tokens from file to connect to Strava
        stravaApi = _api.StravaApi()
        data = stravaApi.GetActivities()
        return Response(data, status=status.HTTP_201_CREATED)

class ActivityView(GenericAPIView):
    serializer_class = IndicatorSerializer

    def get(self, request):
        # type = "Run"
        type = request.GET.get('Activity')
        ## Get the tokens from file to connect to Strava
        stravaApi = _api.StravaApi()
        data = stravaApi.GetActivity(type)
        return Response(data, status=status.HTTP_201_CREATED)

class KpmView(GenericAPIView):
    serializer_class = IndicatorSerializer

    def get(self, request):
        ## Get the tokens from file to connect to Strava
        kpm = _kpm.KeyPerformanceMetrics()
        data = kpm.getKPM()
        return Response(data, status=status.HTTP_201_CREATED)

class ActivityDistanceView(GenericAPIView):
    serializer_class = IndicatorSerializer

    def get(self, request):
        distance = request.GET.get('distance')
        ## Get the tokens from file to connect to Strava
        stravaApi = _api.StravaApi()
        data = stravaApi.GetByDistance(distance)
        return Response(data, status=status.HTTP_201_CREATED)


class AuthenticationView(GenericAPIView):
    serializer_class = AuthenticationSerializer

    def post(self, request):
        serializer = AuthenticationSerializer(data=request.data)

        data = request.data
        email = data.get('email', '')
        password = data.get('password', '')
        ## Get the tokens from file to connect to Strava
        stravaApi = _api.StravaApi()
        user = stravaApi.AuthenticateApi(email,password)
        return Response("success", status=status.HTTP_201_CREATED)

