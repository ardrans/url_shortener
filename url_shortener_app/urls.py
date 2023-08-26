from django.urls import path
from .views import register, login, url_shortening,logout

urlpatterns = [
    path('register/', register.Register.as_view(), name='register'),
    path('login/', login.Login.as_view(), name='login'),
    path('logout/', logout.Logout.as_view(), name='logout'),
    path('<str:url_id>/', url_shortening.RetrieveAndRedirectUrl.as_view(), name='retrieve_url'),
    path('create_url_id/', url_shortening.CreateUrlId.as_view(), name='create_url_id'),
]