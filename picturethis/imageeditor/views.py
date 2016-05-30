"""Use django default views to handle login/logout."""
from django.shortcuts import render_to_response, redirect
from django.contrib.auth import logout as auth_logout
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.template import RequestContext
from django.views.generic import TemplateView


class LoginRequiredMixin(object):
    """Enforce login for particular views."""

    @method_decorator(login_required(login_url='/'))
    def dispatch(self, request, *args, **kwargs):
        """Add login required functionality to all decorated class views."""
        return super(LoginRequiredMixin, self).dispatch(
            request, *args, **kwargs)


class LoginView(TemplateView):
    """Handle User authentication on the frontend."""

    template_name = 'login.html'

    def dispatch(self, request, *args, **kwargs):
        """Check that user has successfully been authenticated."""
        if request.user.is_authenticated():
            return redirect('/home', context_instance=RequestContext(request))
        return super(LoginView, self).dispatch(request, *args, **kwargs)


class HomeView(LoginRequiredMixin, TemplateView):
    template_name = 'dashboard.html'

    def get_context_data(self, **kwargs):
        """Return dictionary representing passed in context."""
        context = super(HomeView, self).get_context_data(**kwargs)
        import ipdb; ipdb.set_trace()
        context['user'] = self.request.user
        context['username'] = self.request.user.username
        return context


# @login_required(login_url='/')
# def home(request):
#     return render_to_response('dashboard.html')


def logout(request):
    auth_logout(request)
    return redirect('/')
