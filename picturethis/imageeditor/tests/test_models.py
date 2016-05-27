import tempfile

from django.contrib.auth.models import User
from django.test import TestCase, override_settings
from PIL import Image
from imageeditor.models import Photo, EditedPhoto


def get_temporary_image(temp_file):
    size = (200, 200)
    color = (255, 0, 0, 0)
    image = Image.new("RGBA", size, color)
    image.save(temp_file, 'jpeg')
    return temp_file


class ImageEditorTest(TestCase):
    """Test accurate creation of models."""

    def setUp(self):
        """Set up new dummy data."""
        user = User.objects.create(username='test', password='test')
        self.owner = User.objects.filter(id=user.id).first()

    @override_settings(MEDIA_ROOT=tempfile.gettempdir())
    def test_dummy_test(self):
            to_save = tempfile.NamedTemporaryFile(suffix=".jpg").name
            test_image = get_temporary_image(to_save)
            picture = Photo.objects.create(image=test_image, owner=self.owner)
            search = Photo.objects.filter(image=test_image).first()
            print "It Worked!, ", picture.image
            self.assertEqual(len(Photo.objects.all()), 1)
            self.assertEqual(len(EditedPhoto.objects.all()), 9)
            self.assertIn(test_image, search.image.name)
            self.assertIsInstance(picture, Photo)
