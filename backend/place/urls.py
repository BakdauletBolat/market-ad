from django.urls import path
from .views import ListCreatePlace,SinglePlaceView

urlpatterns = [
    path('list/', ListCreatePlace.as_view(), name='list_advertising'),
    path('create/',ListCreatePlace.as_view()),
    path('<int:pk>/',SinglePlaceView.as_view())
]

