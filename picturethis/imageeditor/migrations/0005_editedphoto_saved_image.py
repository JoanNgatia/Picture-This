# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-05-25 10:35
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('imageeditor', '0004_finalphoto'),
    ]

    operations = [
        migrations.AddField(
            model_name='editedphoto',
            name='saved_image',
            field=models.BooleanField(default=False),
        ),
    ]