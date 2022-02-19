from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth import get_user_model
from .models import UserType

User = get_user_model()

class UserTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserType
        fields = ('__all__')

class UserSerializer(serializers.ModelSerializer):

    user_type = UserTypeSerializer(read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email','user_type')


class UserCreateSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    email = serializers.EmailField()
    user_type = UserTypeSerializer(read_only=True)

    def create(self, validated_data):

        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password']
        )

        return user

    class Meta:
        model = User
        fields = ("id", "email",'username','user_type', "password", )