from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from viewsets import PhotoListView, EditedPhotoListView, PhotoDetailView


urlpatterns = [
    url(r'^photos/$', PhotoListView.as_view()),
    url(r'^photos/(?P<pk>[0-9]+)/$', PhotoDetailView.as_view()),
    url(r'^edits/$', EditedPhotoListView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
