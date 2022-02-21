from django.db import models

class UserType(models.Model):

    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)


class MyUserManager(BaseUserManager):
    def create_user(self, email, password=None):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            email,
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user






class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )


    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_people = models.BooleanField(default=False)

    username = models.CharField(unique=True,null=True,blank=True,max_length=255)

    user_type = models.ForeignKey(UserType,on_delete=models.CASCADE,null=True,blank=True)



    objects = MyUserManager()

    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin

class OnlineUsers(models.Model):
    type = models.SlugField(unique=True)
    users = models.ManyToManyField(User,blank=True)

class UserActivites(models.Model):
    Online = 'Online'
    Offline = 'Offline'

    activites = [
        (Online, 'Пользователь входил в сайт'),
        (Offline, 'Пользователь выходил из сайта'),
    ]
    created_at = models.DateTimeField(auto_now=True)
    type = models.CharField(
        max_length=20,
        choices=activites
    )

    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name='activites')