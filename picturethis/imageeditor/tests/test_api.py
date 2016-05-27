# import tempfile
# from django.test import override_settings
# from rest_framework.test import APITestCase
# from imageeditor.models import Photo, EditedPhoto
# from PIL import Image


# def create_dummy_image(temp_file):
#     "generate dummy image file."
#     image = Image.new('RGBA', size=(50, 50), color=(155, 0, 0))
#     image.save(temp_file, 'jpeg')
#     return temp_file


# class PhotoAPITest(APITestCase):
    # """Test access to API endpoints."""

#     fixtures = ['photos.json']

    # def setUp(self):
    #     self.login = self.client.login(
    #         username='test', password='test')

#     @override_settings(MEDIA_ROOT=tempfile.gettempdir())
    # def test_api_images_endpoint(self):
    #     """test for accessing images and the prefiltered images
    #     """
    #     response = self.client.get('/api/photos/')
    #     self.assertEqual(response.status_code, 403)
    #     self.assertEqual(len(response.data), 1)
    #     self.assertEqual(Photo.objects.count(), 1)
    #     self.assertEqual(EditedPhoto.objects.count(), 9)

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
