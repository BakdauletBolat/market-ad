# Generated by Django 4.0 on 2022-01-12 21:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('advertising', '0006_advertisingrent'),
    ]

    operations = [
        migrations.AlterField(
            model_name='advertisingimages',
            name='advertising',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='advertising.advertising'),
        ),
    ]
