from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)

from django.urls import path

from authentication.views import RegisterView,LoginView,UserIdentification


urlpatterns = [
    path('token/', LoginView.as_view(), name='token_obtain_pair'),
    path('me/',UserIdentification.as_view()),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/',RegisterView.as_view())
]

