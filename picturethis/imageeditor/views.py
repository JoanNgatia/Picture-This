from django.views.generic import TemplateView
from models import Photo, EditedPhoto


class DashboardView(TemplateView):
    """Main display of original and edited photos."""

    template_name = 'dash/dashboard.html'

    def get_context_data(self, **kwargs):
        """Return dictionary representing passed in context."""
        context = super(DashboardView, self).get_context_data(**kwargs)
        context['photos'] = Photo.objects.all()
        context['edited_photos'] = EditedPhoto.objects.all()
        return context
