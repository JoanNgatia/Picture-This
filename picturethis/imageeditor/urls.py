from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from views import PhotoListView


urlpatterns = [
    url(r'^photos/$', PhotoListView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
