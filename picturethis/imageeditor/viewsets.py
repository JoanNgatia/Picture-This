from rest_framework import generics

from models import Photo, EditedPhoto
from serializers import PhotoSerializer, EditedPhotoSerializer


class PhotoListView(generics.ListCreateAPIView):
    """Handle the URL to list all photos and add onother.

    URL : /api/v1/photos
    Args:
        To add an image:
            image - image_upload field.
    Returns:
    """

    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer


class EditedPhotoListView(generics.ListAPIView):
    """Handle URL to list and create the preview images."""

    queryset = EditedPhoto.objects.all()
    serializer_class = EditedPhotoSerializer
