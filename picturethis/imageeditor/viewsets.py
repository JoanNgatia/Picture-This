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


class PhotoDetailView(generics.ListAPIView):
    """Handle GET to /api/v1/photos/<pk>.

    GET:
        Show details of a particular picture
    """

    serializer_class = PhotoSerializer

    def get_queryset(self):
        """GET /api/images/detail/<pk>."""
        logged_in_user = self.request.user
        pk = self.kwargs.get('pk')

        return Photo.objects.filter(owner=logged_in_user, pk=pk)
