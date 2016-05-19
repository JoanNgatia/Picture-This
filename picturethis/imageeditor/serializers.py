from rest_framework import serializers

from models import Photo, EditedPhoto, FinalPhoto


class PhotoSerializer(serializers.ModelSerializer):
    """Define original photo serializer fields."""

    image = serializers.ImageField(use_url=True)

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


class FinalPhotoSerializer(serializers.ModelSerializer):
    """Define final saved photo serializer fields."""

    class Meta:
        model = FinalPhoto
        fields = ('image', 'effect_applied', 'created_at')
