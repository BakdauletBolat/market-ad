from django.contrib.auth.models import User
from rest_framework.generics import CreateAPIView
from rest_framework import permissions
from rest_framework.views import APIView
from .serializers import UserCreateSerializer, UserSerializer
from rest_framework.response import Response

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class TokenObtainUserSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs);
        print(self.user)
        data['user'] = UserCreateSerializer(self.user).data
        return data

class RegisterView(CreateAPIView):

    model = User
    permission_classes = [permissions.AllowAny]
    serializer_class = UserCreateSerializer


class LoginView(TokenObtainPairView):

    serializer_class = TokenObtainUserSerializer


class UserIdentification(APIView):

    def get(self,request):
        user = request.user

        return Response(UserSerializer(user).data)
