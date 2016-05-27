import tempfile

from django.contrib.auth.models import User
from django.test import TestCase, override_settings
from PIL import Image
from imageeditor.models import Photo, EditedPhoto, FinalPhoto


def get_temporary_image(temp_file):
    size = (200, 200)
    color = (255, 0, 0, 0)
    image = Image.new("RGBA", size, color)
    image.save(temp_file, 'jpeg')
    return temp_file


class ImageEditorTest(TestCase):
    """Test accurate creation of models."""

#     # fixtures = ['photos.json']

    def setUp(self):
        """Set up new dummy data."""
        user = User.objects.create(username='test', password='test')
        self.owner = User.objects.filter(id=user.id).first()
#     # def tearDown(self):
#     #     """Clean up database after successful test run."""
#     #     Photo.objects.all().delete()
#     #     EditedPhoto.objects.all().delete()
#     #     FinalPhoto.objects.all().delete()

    @override_settings(MEDIA_ROOT=tempfile.gettempdir())
    def test_dummy_test(self):
            # to_save = tempfile.NamedTemporaryFile()
            to_save = tempfile.NamedTemporaryFile(suffix=".jpg").name
            test_image = get_temporary_image(to_save)
            # test_image.seek(0)
            # test_image = tempfile.NamedTemporaryFile(suffix=".jpg").name
            picture = Photo.objects.create(image=test_image, owner=self.owner)
            print "It Worked!, ", picture.image
            self.assertEqual(len(Photo.objects.all()), 1)
