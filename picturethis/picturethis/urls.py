"""picturethis URL Configuration
The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from rest_framework.authtoken import views
from imageeditor.views import LoginView, HomeView
import settings

urlpatterns = [
    # django admin interface
    url(r'^admin/', admin.site.urls),
    # api endpoints
    url(r'^api/', include('imageeditor.urls')),
    # api documentation
    url(r'^docs/', include('rest_framework_docs.urls')),
    # local api token
    url(r'^api-token-auth/',
        views.obtain_auth_token, name='token'),
    # media route
    url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {
        'document_root': settings.MEDIA_ROOT,
    }),
    # frontend routes
    url(r'^$', LoginView.as_view(), name="login"),
    url(r'^home/$', HomeView.as_view(), name="login"),
    url(r'^logout/$', 'imageeditor.views.logout'),
    # social authentication
    url('', include('social.apps.django_app.urls', namespace='social')),
]
