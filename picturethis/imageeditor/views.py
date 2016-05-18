"""Use django default views to handle login/logout."""
from django.shortcuts import render_to_response, redirect
from django.contrib.auth import logout as auth_logout
from django.contrib.auth.decorators import login_required
from django.views.generic import TemplateView


class LoginView(TemplateView):
    """Handle User authentication on the frontend."""

    template_name = 'login.html'

    def dispatch(self, request, *args, **kwargs):
        """Check that user has successfully been authenticated."""
        if request.user.is_authenticated():
            return redirect('/home')
        return super(LoginView, self).dispatch(request, *args, **kwargs)


@login_required(login_url='/')
def home(request):
    return render_to_response('dashboard.html')


def logout(request):
    auth_logout(request)
    return redirect('/')
