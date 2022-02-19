from rest_framework import permissions

class AuthorPermission(permissions.BasePermission):

    message = "You dont have Permission Дурак"

    def has_object_permission(self, request,view,obj):
        if request.user.is_admin == True:
            return True
        user = request.user
        return user == obj.user

class IsSuperUser(permissions.BasePermission):
    
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_admin)