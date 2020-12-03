from django.urls import path
from .views import IndicatorView


urlpatterns = [
    path('indicator', IndicatorView.as_view()),
]