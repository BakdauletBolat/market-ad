# Generated by Django 4.0.1 on 2022-02-27 08:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0002_onlineusers'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='onlineusers',
            options={'verbose_name': 'Онлайн пользователи', 'verbose_name_plural': 'Онлайн пользователи'},
        ),
        migrations.AlterModelOptions(
            name='user',
            options={'verbose_name': 'Пользователь', 'verbose_name_plural': 'Пользователи'},
        ),
        migrations.AlterModelOptions(
            name='useractivites',
            options={'verbose_name': 'Активность', 'verbose_name_plural': 'Активности'},
        ),
        migrations.AlterModelOptions(
            name='usertype',
            options={'verbose_name': 'Тип', 'verbose_name_plural': 'Типы'},
        ),
    ]