from rest_framework import serializers

from models import Photo, EditedPhoto


class PhotoSerializer(serializers.ModelSerializer):
    """Define original photo serializer fields."""

    class Meta:
        model = Photo
        fields = ('id', 'owner', 'image',
                  'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at')


class EditedPhotoSerializer(serializers.ModelSerializer):
    """Define edited photo serializer fields."""

    class Meta:
        model = EditedPhoto
        fields = ('id', 'image', 'parent_image', 'effect',
                  'created_at', 'updated_at')
