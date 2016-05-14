from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# from imagekit.models import ImageSpecField
# from imagekit.processors import ResizeToFit

from effects import ImageEffects

effects_list = {
    'filters': ['blur', 'contour', 'detail', 'emboss', 'smooth'],
    'operations': ['flip', 'grayscale', 'invert', 'mirror']
}


class Photo(models.Model):
    """Create base model for original Photo details."""

    owner = models.ForeignKey(User, related_name='photos')
    image = models.ImageField(upload_to='myphotos/')
    # thumbnail = ImageSpecField(source='image',
    #                            processors=[ResizeToFit(300, 150)],
    #                            format='JPEG')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        """Extend parent meta class."""

        ordering = ['-updated_at']

    # def __unicode__(self):
    #     text = "thumbnail ID: " + str(self.thumbnail)
    #     return text


class EditedPhoto(models.Model):
    """Base model for photos that have been edited and the preview."""

    image = models.TextField(max_length=250)
    parent_image = models.ForeignKey(Photo)
    effect = models.CharField(max_length=80)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        """Extend parent meta class."""

        ordering = ['-updated_at']


@receiver(post_save, sender=Photo)
def apply_effect(sender, **kwargs):
    """Create edited image previews immediately a new photo is uploaded."""
    if kwargs.get('created'):
        for key, value in effects_list.iteritems():
            for effect_type in value:
                effect = ImageEffects(
                    kwargs.get('instance').image, effect_type)
                to_save = EditedPhoto()
                if key == 'filters':
                    to_save.image = effect.filters()
                elif key == 'operations':
                    to_save.image = effect.operations()
                to_save.parent_image = kwargs.get('instance')
                to_save.effect = effect_type
                to_save.save()
