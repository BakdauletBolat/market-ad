from django.contrib import admin
from .models import Advertising, AdvertisingRent, AdvertisingType, AdvertisingImages
# Register your models here.
from django import forms


class MyAdvertisingRentAdminForm(forms.ModelForm):
    def clean(self):
        advertising = self.cleaned_data['advertising']
        print(advertising)
        start_time = self.cleaned_data['start_time']

        for rent in advertising.rents.all():
            if rent.end_time > start_time:
                raise forms.ValidationError(
                f"На это выбранное время уже есть обьявление имя компаний: {rent.organization_name}"
                )

        return super().clean()
        
class AdvertisingRentAdmin(admin.ModelAdmin):
    form = MyAdvertisingRentAdminForm


class AdvertisingAdmin(admin.ModelAdmin):

    list_display = ('id','name','is_archived','user')
    list_editable = ('is_archived',)


admin.site.register(Advertising,AdvertisingAdmin)
admin.site.register(AdvertisingType)
admin.site.register(AdvertisingImages)
admin.site.register(AdvertisingRent,AdvertisingRentAdmin)







# class a():

#     cleaned_data = super().clean()

#     startdate = cleaned_data.get("startdate")
#     expiredate = cleaned_data.get("expiredate")

#     if startdate and expiredate and expiredate < startdate:
#         raise forms.ValidationError(
#                 "Expiredate should be greater than startdate."
#             )