from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from viewsets import PhotoListView, EditedPhotoListView, PhotoDetailView, \
    FinalPhotoView

urlpatterns = [
    url(r'^photos/$', PhotoListView.as_view()),
    url(r'^photos/(?P<pk>[0-9]+)/$', PhotoDetailView.as_view()),
    url(r'^photos/(?P<pk>[0-9]+)/edits/$', EditedPhotoListView.as_view()),
    url(r'^photos/(?P<photo_id>[0-9]+)/edits/(?P<pk>[0-9]+)/$',
        FinalPhotoView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
