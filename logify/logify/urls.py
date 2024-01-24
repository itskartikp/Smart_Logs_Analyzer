# logify/urls.py
# logify/urls.py
from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('log_analyzer/', include('appname.urls')),
    path('', RedirectView.as_view(url='/log_analyzer/')),
    # Add other project-level URLs as needed
]
