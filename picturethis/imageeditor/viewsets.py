"""Defines the api endpoints for image creation, retrieval ,filtering."""

from rest_framework import generics
from rest_framework.permissions import AllowAny

from models import Photo, EditedPhoto
from serializers import PhotoSerializer, EditedPhotoSerializer, \
    FinalPhotoSerializer


class PhotoListView(generics.ListCreateAPIView):
    """Handle the URL to list all photos and add onother.

    URL : /api/v1/photos
    Args:
        To add an image:
            image - image_upload field.
    Returns:
        POST/GET -- Dictionary containing original photo details as per
                    serializer class
    """

    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    permission_classes = (AllowAny, )


class PhotoDetailView(generics.RetrieveDestroyAPIView):
    """Handle access to a particular photo.

    URL : /api/v1/photos/<photo_id>
    Methods: GET
    Args:
        pk = original photo id
    Returns:
        Single image details per serializer class
    """

    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    permission_classes = (AllowAny, )


class EditedPhotoListView(generics.ListAPIView):
    """Handle URL to list all the preview images with the prerendered filters.

    URL : /api/v1/photos/<photo_id>/edits/
    Methods: GET
    Args:
        pk = original photo id
    Returns:
        List of all preview filter images
    """

    serializer_class = EditedPhotoSerializer
    permission_classes = (AllowAny, )

    def get_queryset(self):
        """"Return previews as per original photo id."""
        pk = self.kwargs.get('pk')
        return EditedPhoto.objects.filter(parent_image=pk)


class EditedPhotoUpdateView(generics.RetrieveUpdateAPIView):
    """Handle URL to save a particular filter thumbnail.

    URL : /api/v1/photos/<photo_id>/edits/<edits_id>/
    Methods: PUT
    Args:
        photo_id = original photo id
        edits_id = filtered thumbnail id
    Returns:
        Single filtered image
    """

    serializer_class = EditedPhotoSerializer
    permission_classes = (AllowAny, )

    def get_queryset(self):
        """"Return previews as per original photo id."""
        parent_id = self.kwargs.get('photo_id')
        filter_id = self.kwargs.get('pk')
        return EditedPhoto.objects.filter(parent_image=parent_id, pk=filter_id)


class FinalPhotoView(generics.CreateAPIView):
    """Handle URL to access a single filter image for final saving.

    URL : /api/v1/photos/<photo_id>/edits/<preview_id>/saved/
    Methods: POST
    Args:
        photo_id = original photo id
        pk = preview photo id
    Returns:
        Single filtered Image detail
    """

    serializer_class = FinalPhotoSerializer
    permission_classes = (AllowAny, )

    def get_queryset(self):
        """"Return single previews as per original photo id."""
        preview_id = self.kwargs.get('pk')
        photo_id = self.kwargs.get('photo_id')
        return EditedPhoto.objects.filter(id=preview_id, parent_image=photo_id)
