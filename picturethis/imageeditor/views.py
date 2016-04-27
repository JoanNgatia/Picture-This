from rest_framework import generics

from models import Photo
from serializers import PhotoSerializer


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
