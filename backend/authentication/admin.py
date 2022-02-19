from curses.ascii import US
from django.contrib import admin
from .models import User, UserActivites,UserType
# Register your models here.


class UserAdmin(admin.ModelAdmin):
    list_display = ('email','get_activitess')

    def get_activitess(self,obj):

        length = len(obj.activites.all())
        if length <= 0:
            return '-'
        return  obj.activites.all()[length-1].type

admin.site.register(User,UserAdmin)
admin.site.register(UserType)
admin.site.register(UserActivites)