# Generated by Django 4.0 on 2022-01-01 19:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Advertising',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_created=True)),
                ('name', models.CharField(max_length=255)),
                ('desription', models.TextField(blank=True, null=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('lat', models.BigIntegerField()),
                ('lng', models.BigIntegerField()),
                ('zoom', models.BigIntegerField()),
            ],
            options={
                'verbose_name': 'Реклама',
                'verbose_name_plural': 'Рекламы',
            },
        ),
        migrations.CreateModel(
            name='AdvertisingType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_created=True)),
                ('name', models.CharField(max_length=255)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('icon', models.ImageField(blank=True, null=True, upload_to='advertising-types/')),
            ],
            options={
                'verbose_name': 'Тип рекламы',
                'verbose_name_plural': 'Типы рекламов',
            },
        ),
        migrations.CreateModel(
            name='AdvertisingImages',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='advertising-images/')),
                ('advertising', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='advertising.advertising')),
            ],
            options={
                'verbose_name': 'Фото Реклама',
                'verbose_name_plural': 'Фотки Реклама',
            },
        ),
        migrations.AddField(
            model_name='advertising',
            name='type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='advertising', to='advertising.advertisingtype'),
        ),
    ]
