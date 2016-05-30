from django.test import TestCase, Client
from django.core.urlresolvers import reverse
from django.contrib.auth.models import User
from imageeditor.models import Photo, EditedPhoto


class TestPhotoView(TestCase):
    """Test django views."""

    fixtures = ['photos.json']

    def setUp(self):
        """Create base data for testing."""
        self.client = Client()
        self.user = User.objects.create(
            username='test',
            password='test'
        )
        self.user.set_password('test')
        self.user.save()
        self.login = self.client.login(
            username='test', password='test')

    def tearDown(self):
        """Databse clean up after successful test run."""
        User.objects.all().delete()
        Photo.objects.all().delete()
        EditedPhoto.objects.all().delete()

    def test_user_login(self):
        """Test that a registered user can login."""
        response = self.client.post(reverse('login'),
                                    {'username': 'test',
                                     'password': 'test'})
        self.assertEqual(response.status_code, 302)

    def test_user_logout(self):
        """Test that a logged in user can logout."""
        response = self.client.post('/logout/')
        self.assertEqual(response.status_code, 302)

    def test_user_access_dashboard(self):
        """Test that a logged in user can access their dashboard."""
        response = self.client.get('/home/')
        self.assertEqual(response.status_code, 200)
