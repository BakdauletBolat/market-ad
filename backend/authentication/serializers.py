from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email')


class UserCreateSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    last_name = serializers.CharField()
    first_name = serializers.CharField()
    email = serializers.EmailField()

    def create(self, validated_data):

        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )

        user.first_name = validated_data['first_name']
        user.last_name = validated_data['last_name']
        user.email = validated_data['email']

        return user

    class Meta:
        model = User
        fields = ("id", "username", "email",
                  "first_name", "last_name", "password", )