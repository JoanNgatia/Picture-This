from django.test import TestCase, RequestFactory
from imageeditor.models import Photo, EditedPhoto, FinalPhoto
from PIL import Image


class ImageEditorTest(TestCase):
    """Test accurate creation of models."""

    def setUp(self):
        """Set up new dummy data."""

    def tearDown(self):
        """Clean up database after successful test run."""
        Photo.objects.all().delete()
        EditedPhoto.objects.all().delete()
        FinalPhoto.objects.all().delete()
