from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User


class Photo(models.Model):
    """Create base model for original Photo details."""

    owner = models.ForeignKey(User, related_name='photos')
    image = models.ImageField(upload_to='myphotos/')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        """Extend parent meta class."""

        ordering = ['-updated_at']


class EditedPhoto(models.Model):
    """Base model for photos that have been edited/filtered through."""

    image = models.ImageField(upload_to='editedphotos/')
    parent_image = models.ForeignKey(Photo)
    effect = models.CharField(max_length=80)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        """Extend parent meta class."""

        ordering = ['-updated_at']
