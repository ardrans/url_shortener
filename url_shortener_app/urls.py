from django.urls import path
from .views import register, login, create_retreive_url_id,logout

urlpatterns = [
    path('register/', register.Register.as_view(), name='register'),
    path('login/', login.Login.as_view(), name='login'),
    path('logout/', logout.Logout.as_view(), name='logout'),
    path('retrieve_url/<str:url_id>/', create_retreive_url_id.RetrieveAndRedirectUrl.as_view(), name='retrieve_url'),
    path('create_url_id/', create_retreive_url_id.CreateUrlId.as_view(), name='create_url_id'),
]