from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import generics
from .models import Advertising, AdvertisingImages
from .serializers import AdvertisingSerializer
from .permisions import AuthorPermission, IsSuperUser


class ListCreateAdvertising(generics.ListCreateAPIView):

    queryset = Advertising.objects.all()

    serializer_class = AdvertisingSerializer

    def list(self, request):
        queryset = self.get_queryset()
        if request.user.is_admin or request.user.is_people:
            serializer = self.serializer_class(queryset, many=True)
        else:
            serializer = self.serializer_class(queryset, many=True).fitler(user=request.user)
        return Response(serializer.data)

    def perform_create(self, serializer):
        ad = serializer.save(user=self.request.user)
        images = self.request.FILES.getlist('images')

        for image in images:
            imageA = AdvertisingImages(advertising=ad,image=image)
            imageA.save()


    
    permission_classes = [permissions.IsAuthenticated]


class SingleAdvertisingView(generics.RetrieveUpdateDestroyAPIView):

    permission_classes = [permissions.IsAuthenticated,AuthorPermission]
    queryset = Advertising.objects.all()
    serializer_class = AdvertisingSerializer



