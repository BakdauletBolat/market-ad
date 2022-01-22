from django.urls import path
from .views import ListCreateAdvertising,SingleAdvertisingView

urlpatterns = [
    path('list/', ListCreateAdvertising.as_view(), name='list_advertising'),
    path('create/',ListCreateAdvertising.as_view()),
    path('<int:pk>/',SingleAdvertisingView.as_view())
]

