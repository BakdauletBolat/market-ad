from datetime import datetime
from typing import List
from django.db import models
from rest_framework import fields, serializers
from advertising.models import Advertising, AdvertisingImages, AdvertisingType,AdvertisingRent
from authentication.serializers import UserSerializer
from collections.abc import Callable
from django.utils import timezone


class AdvertisingTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = AdvertisingType
        fields = ('__all__')

class AdvertisingRentSerializer(serializers.ModelSerializer):

    class Meta:
        model = AdvertisingRent
        fields = ('__all__')

class AdvertisingImagesSerializer(serializers.ModelSerializer):

    id = serializers.CharField(required=False)
    image = serializers.CharField(required=False)
    image_url = serializers.SerializerMethodField('get_image_url')

    def get_image_url(self, obj):
        return obj.image.url

    class Meta:
        model = AdvertisingImages
        fields = ('id','image','image_url')

class AdvertisingSerializer(serializers.ModelSerializer):

    type = AdvertisingTypeSerializer(required=False)
    type_id = serializers.IntegerField()
    user = UserSerializer(required=False)

    rent = serializers.SerializerMethodField()
    def get_rent(self,obj):
        rents = obj.rents.all()
        length_rent = len(rents)
        now = timezone.now()
        isExpired = False
        for rent in rents:
            if now > rent.end_time:
                isExpired = True
            else:
                isExpired = False

        if isExpired:
            return None

        if length_rent > 0:
            newList = []
            for rent in rents:
                if now < rent.end_time:
                    newList.append(rent)
            return AdvertisingRentSerializer(newList,many=True).data

        

        return None

    images = AdvertisingImagesSerializer(many=True,required=False)

    def create(self, validated_data):

        # images = validated_data.pop('images')
        print(validated_data)
        advertising = Advertising.objects.create(**validated_data) 
            
        return advertising

    
    class Meta:
        model = Advertising
        fields = ('__all__')