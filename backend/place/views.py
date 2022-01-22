from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import generics
from .models import Place
from .serializers import PlaceSerializer

class ListCreatePlace(generics.ListCreateAPIView):

    queryset = Place.objects.all()

    serializer_class = PlaceSerializer
    
    # permission_classes = [permissions.IsAuthenticated]


class SinglePlaceView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Place.objects.all()
    serializer_class = PlaceSerializer



