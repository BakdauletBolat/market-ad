from operator import mod
from django.db import models
from authentication.models import User
from django import forms

class AdvertisingType(models.Model):

    name = models.CharField('Имя',max_length=255)
    created_at = models.DateTimeField(auto_created=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    color = models.CharField('Цвет',null=True,blank=True,default='#0077c2',max_length=10)
    icon_text = models.CharField('Иконка Material Icons',null=True, blank=True,default='apartment',max_length=255)

    def __str__(self):
        return self.name

    class Meta:

        verbose_name = 'Тип рекламы'
        verbose_name_plural = 'Типы рекламов'

class NearPlace(models.Model):

    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Advertising(models.Model):

    name = models.CharField('Имя рекламного места',max_length=255,null=True,blank=True)
    address = models.TextField('Адрес',blank=True)
    flows = models.TextField('Дорожные потоки',null=True,blank=True)
    desription = models.TextField('Описание',null=True,blank=True)
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    size = models.CharField('Размеры',max_length=255,blank=True,null=True)

    type = models.ForeignKey(AdvertisingType,verbose_name='Тип',related_name='advertising',on_delete=models.CASCADE)
    lat = models.FloatField('Lat местоположение')
    lng = models.FloatField('Lng местоположение')
    zoom = models.FloatField('Зум')

    is_archived = models.BooleanField('В архиве',default=False)

    user = models.ForeignKey(User,verbose_name='Автор',on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:

        verbose_name = 'Реклама'
        verbose_name_plural = 'Рекламы'


class AdvertisingRent(models.Model):

    organization_name = models.CharField('Имя организация',max_length=255)
    organization_phone = models.CharField('Телефон организаций',max_length=255)
    start_time = models.DateTimeField(verbose_name='Дата начало')
    end_time = models.DateTimeField(verbose_name='Дата оканчание')
    expired = models.BooleanField(default=False)
    advertising = models.ForeignKey(Advertising, on_delete=models.CASCADE, null=True,blank=True,related_name="rents",verbose_name='Рекламное место')

    def clean(self):
        advertising = self.advertising
        start_time = self.start_time

        for rent in advertising.rents.all():
            if rent.end_time > start_time:
                raise forms.ValidationError(
                f"На это выбранное время уже есть обьявление имя компаний: {rent.organization_name}"
                )
                
    
    def __str__(self):
        return f"{self.advertising.name} - {self.organization_name}: {self.end_time-self.start_time}"
    

    class Meta:

        verbose_name = 'Аренда'
        verbose_name_plural = 'Аренды'


class AdvertisingImages(models.Model):

    advertising = models.ForeignKey(Advertising,on_delete=models.CASCADE,related_name='images')
    image = models.ImageField(upload_to='advertising-images/')

    def __str__(self):
        return f'Фотография: {self.advertising.name}'

    class Meta:
    
        verbose_name = 'Фото Реклама'
        verbose_name_plural = 'Фотки Реклама'
