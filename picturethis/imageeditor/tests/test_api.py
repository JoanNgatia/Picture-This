import tempfile
from django.contrib.auth.models import User
from django.test import override_settings
from django.core.urlresolvers import reverse
from rest_framework.test import APITestCase
from imageeditor.models import Photo, EditedPhoto
from PIL import Image


def get_temporary_image(temp_file):
    """Generate dummy image file."""
    image = Image.new('RGBA', size=(50, 50), color=(155, 0, 0))
    image.save(temp_file, 'jpeg')
    return temp_file


class PhotoAPITest(APITestCase):
    """Test access to API endpoints."""

    fixtures = ['photos.json']

    def test_access_to_photos(self):
        """Test that users can retrieve photos from the db."""
        response = self.client.get('/api/photos/')
        self.assertEqual(response.status_code, 403)

        self.client.login(username="joan_ngatia", password="ASHLEY19")
        auth_response = self.client.get('/api/photos/')

        self.assertEqual(200, auth_response.status_code)
        self.assertEqual(len(auth_response.data), 0)

    @override_settings(MEDIA_ROOT=tempfile.gettempdir())
    def test_api_images_endpoint(self):
        """Test image upload and filter creation at upload."""
        to_save = tempfile.NamedTemporaryFile(suffix=".jpg").name
        test_image = get_temporary_image(to_save)
        photo = {'image': test_image}
        response = self.client.post('/api/photos/', photo)
        self.assertEqual(response.status_code, 403)

        self.client.login(username="joan_ngatia", password="ASHLEY19")
        with open(test_image) as image:
            auth_response = self.client.post(
                '/api/photos/',
                {'image': image},
                format='multipart'
            )
        self.assertEqual(auth_response.status_code, 201)
        self.assertEqual(Photo.objects.count(), 1)
        self.assertEqual(EditedPhoto.objects.count(), 9)

        get_response = self.client.get('/api/photos/1/')
        self.assertEqual(get_response.status_code, 200)

        edits_response = self.client.get('/api/photos/1/edits/')
        self.assertEqual(edits_response.status_code, 200)
        self.assertEqual(len(edits_response.data), 9)

        delete_response = self.client.delete('/api/photos/1/')
        self.assertEqual(delete_response.status_code, 204)
        self.assertEqual(Photo.objects.count(), 0)
        self.assertEqual(len(EditedPhoto.objects.filter(parent_image=1)), 0)


