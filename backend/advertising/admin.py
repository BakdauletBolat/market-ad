from django.contrib import admin
from .models import Advertising, AdvertisingRent, AdvertisingType, AdvertisingImages
# Register your models here.


admin.site.register(Advertising)
admin.site.register(AdvertisingType)
admin.site.register(AdvertisingImages)
admin.site.register(AdvertisingRent)