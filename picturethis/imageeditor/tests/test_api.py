from rest_framework.test import APITestCase
from django.core.urlresolvers import reverse
from imageeditor.models import Photo
# from imageeditor.models import Photo, EditedPhoto
from PIL import Image


def create_dummy_image(temp_file):
    "generate dummy image file."
    image = Image.new('RGBA', size=(50, 50), color=(155, 0, 0))
    image.save(temp_file, 'jpg')
    return temp_file


class PhotoAPITest(APITestCase):
    """Test access to API endpoints."""

    def setUp(self):
        self.login = self.client.login(
            username='test', password='test')

    def test_api_images_endpoint(self):
        """test for getting images
        """
        response = self.client.get('/api/photos/')
        self.assertEqual(response.status_code, 200)

