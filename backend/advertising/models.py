from django.db import models
from django.contrib.auth.models import User

class AdvertisingType(models.Model):

    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_created=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    color = models.CharField(null=True,blank=True,default='#0077c2',max_length=10)
    icon_text = models.CharField(null=True, blank=True,default='apartment',max_length=255)

    def __str__(self):
        return self.name

    class Meta:

        verbose_name = 'Тип рекламы'
        verbose_name_plural = 'Типы рекламов'

class Advertising(models.Model):

    name = models.CharField(max_length=255)
    desription = models.TextField(null=True,blank=True)

    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    type = models.ForeignKey(AdvertisingType,related_name='advertising',on_delete=models.CASCADE)
    lat = models.FloatField()
    lng = models.FloatField()
    zoom = models.FloatField()

    user = models.ForeignKey(User,on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:

        verbose_name = 'Реклама'
        verbose_name_plural = 'Рекламы'


class AdvertisingRent(models.Model):

    organization_name = models.CharField(max_length=255)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    expired = models.BooleanField(default=False)

    advertising = models.ForeignKey(Advertising, on_delete=models.CASCADE, null=True,blank=True,related_name="rent")

    def __str__(self):
        return f"{self.advertising.name} - {self.organization_name}: {self.end_time-self.start_time}"


class AdvertisingImages(models.Model):

    advertising = models.ForeignKey(Advertising,on_delete=models.CASCADE,related_name='images')
    image = models.ImageField(upload_to='advertising-images/')

    def __str__(self):
        return f'Фотография: {self.advertising.name}'

    class Meta:
    
        verbose_name = 'Фото Реклама'
        verbose_name_plural = 'Фотки Реклама'