from django.urls import path
from .views import ActivitiesView, AuthenticationView


urlpatterns = [
    path('activities', ActivitiesView.as_view()),
    path('authenticate', AuthenticationView.as_view()),

]