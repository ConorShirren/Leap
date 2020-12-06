from django.urls import path
from .views import ActivitiesView, AuthenticationView, ActivityView, ActivityDistanceView


urlpatterns = [
    path('activities', ActivitiesView.as_view()),
    path('activity/type', ActivityView.as_view()),
    path('activity/distance', ActivityDistanceView.as_view()),
    path('authenticate', AuthenticationView.as_view()),

]