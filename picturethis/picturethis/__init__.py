import os

if not os.getenv('CI') and not os.getenv('HEROKU'):
    from django_envie.workroom import convertfiletovars
    convertfiletovars()

# if os.getenv('HEROKU') is not None:
#     from .production import *
