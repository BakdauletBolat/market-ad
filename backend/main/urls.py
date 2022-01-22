from django.urls import path, include

urlpatterns = [
    path('auth/', include('authentication.urls')),
    path('advertising/',include('advertising.urls')),
    path('place/',include('place.urls'))
]