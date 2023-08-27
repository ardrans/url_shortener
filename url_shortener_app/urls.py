from django.urls import path
from .views import register, login, url_shortening,logout

urlpatterns = [
    path('register/', register.Register.as_view(), name='register'),
    path('login/', login.Login.as_view(), name='login'),
    path('logout/', logout.Logout.as_view(), name='logout'),
    path('create_short_url/', url_shortening.CreateShortUrl.as_view(), name='create_short_url'),
    path('list_urls/', url_shortening.ListUserUrls.as_view(), name='List_user_urls'),
]