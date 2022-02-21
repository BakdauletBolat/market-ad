
from django.contrib import admin
from .models import OnlineUsers, User, UserActivites,UserType
from django import forms

class UserCreationForm(forms.ModelForm):

    
    class Meta:
        model = User
        fields = ('email','password','last_login','user_type','is_active','is_admin','is_people','username')

    def save(self, commit=True):
        user = super(UserCreationForm, self).save(commit=False)
        user.set_password(self.cleaned_data["password"])
        if commit:
            user.save()
        return user

class UserAdmin(admin.ModelAdmin):
    form = UserCreationForm
    list_display = ('email','get_activitess')

    def get_activitess(self,obj):
        length = len(obj.activites.all())
        if length <= 0:
            return '-'
        return  obj.activites.all()[length-1].type

admin.site.register(User,UserAdmin)
admin.site.register(UserType)
admin.site.register(UserActivites)
admin.site.register(OnlineUsers)