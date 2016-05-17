from rest_framework import generics
from rest_framework.permissions import AllowAny

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
    permission_classes = (AllowAny, )


class EditedPhotoListView(generics.ListAPIView):
    """Handle URL to list the preview images with the prerendered filters."""

    # queryset = EditedPhoto.objects.all()
    serializer_class = EditedPhotoSerializer
    permission_classes = (AllowAny, )

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        return EditedPhoto.objects.filter(parent_image=pk)


class PhotoDetailView(generics.ListAPIView):
    """Handle GET to /api/v1/photos/<pk>.

    GET:
        Show details of a particular picture
    """

    serializer_class = PhotoSerializer
    permission_classes = (AllowAny, )

    def get_queryset(self):
        """GET /api/images/detail/<pk>."""
        # logged_in_user = self.request.user
        pk = self.kwargs.get('pk')
        return Photo.objects.filter(pk=pk)
        # return Photo.objects.filter(owner=logged_in_user, pk=pk)
