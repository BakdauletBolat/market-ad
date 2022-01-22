from django.db import models


class PlaceType(models.Model):

    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_created=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    color = models.CharField(null=True,blank=True,default='#0077c2',max_length=10)
    icon_text = models.CharField(null=True, blank=True,default='apartment',max_length=255)

    def __str__(self):
        return self.name

    class Meta:

        verbose_name = 'Тип место'
        verbose_name_plural = 'Типы местов'

class Place(models.Model):

    name = models.CharField(max_length=255)
    desription = models.TextField(null=True,blank=True)

    created_at = models.DateTimeField(auto_created=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    type = models.ForeignKey(PlaceType,related_name='places',on_delete=models.CASCADE)
    lat = models.FloatField()
    lng = models.FloatField()
    zoom = models.BigIntegerField()

    def __str__(self):
        return self.name

    class Meta:

        verbose_name = 'Место'
        verbose_name_plural = 'Места'


class PlaceImages(models.Model):

    place = models.ForeignKey(Place,on_delete=models.CASCADE)
    image = models.ImageField(upload_to='place-images/')

    def __str__(self):
        return f'Фотография: {self.place.name}'

    class Meta:
    
        verbose_name = 'Фото месты'
        verbose_name_plural = 'Фотки местов'




