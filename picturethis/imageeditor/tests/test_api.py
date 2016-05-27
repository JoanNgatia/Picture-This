import tempfile
from django.contrib.auth.models import User
from django.test import override_settings
from django.core.urlresolvers import reverse
from rest_framework.test import APITestCase
from imageeditor.models import Photo, EditedPhoto
from PIL import Image


def get_temporary_image(temp_file):
    "generate dummy image file."
    image = Image.new('RGBA', size=(50, 50), color=(155, 0, 0))
    image.save(temp_file, 'jpeg')
    return temp_file


class PhotoAPITest(APITestCase):
    """Test access to API endpoints."""

#     fixtures = ['photos.json']

    def setUp(self):
        # user = User.objects.create(username='test', password='test')
        # self.owner = User.objects.filter(id=user.id).first()
        token_url = reverse('token')
        data = {
            'username': 'test', 'password': 'test'}
        self.response = self.client.post(token_url, data)
        self.token = self.response.data.get('token')

    @override_settings(MEDIA_ROOT=tempfile.gettempdir())
    def test_api_images_endpoint(self):
        """test for accessing images and the prefiltered images
        """
        # to_save = tempfile.NamedTemporaryFile(suffix=".jpg").name
        # test_image = get_temporary_image(to_save)
        # Photo.objects.create(image=test_image, owner=self.owner)
        response = self.client.get('/api/photos/')
        self.assertEqual(response.status_code, 403)
        # self.assertEqual(len(response.data), 1)
        # self.assertEqual(Photo.objects.count(), 1)
        # self.assertEqual(EditedPhoto.objects.count(), 9)

        # new_image_save = tempfile.NamedTemporaryFile(suffix=".jpg").name
        # new_image = get_temporary_image(new_image_save)
        # data = {'image': new_image, 'owner': self.owner}
        # response = self.client.post('/api/photos/', data)
        # self.assertEqual(response.status_code, 403)

# #     def test_upload_image(self):
#         # """"Test that a user can upload an image."""
#         # create temporary file
#         # temp_file = tempfile.NamedTemporaryFile()
#         # test_image = create_dummy_image(temp_file)
#         # data = {'image': 'myphotos/DPKNIIN5X3.jpg', 'owner': 1}

#         # response = self.client.post('/api/photos/', data)
#         # self.assertEqual(response.status_code, 201)
#         # self.assertEqual(len(response.data), 3)
#         # self.assertEqual(Photo.objects.count(), 3)
#         # self.assertEqual(EditedPhoto.objects.count(), 27)
