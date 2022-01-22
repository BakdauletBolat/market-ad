from rest_framework import serializers
from place.models import Place, PlaceType

class PlaceTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = PlaceType
        fields = ('__all__')

class PlaceSerializer(serializers.ModelSerializer):

    type = PlaceTypeSerializer(required=False)
    type_id = serializers.IntegerField()
    
    class Meta:
        model = Place
        fields = ('__all__')