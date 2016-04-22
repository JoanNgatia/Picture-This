from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User


class Photo(models.Model):
    """Create base model for Photo details."""

    owner = models.ForeignKey(User, related_name='photos')
    image = models.ImageField(upload_to='myphotos/')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        """Extend parent meta class."""

        ordering = ['-updated_at']
