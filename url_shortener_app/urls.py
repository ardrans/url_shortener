from django.urls import path
from .views import Register,Login, CreateUrlId

urlpatterns = [
    path('register/', Register.as_view(), name='register'),
    path('login/', Login.as_view(), name='login'),
    #path('posts/<int:pk>/', HandlingPosts.as_view(), name='posts'),
    path('create_url_id/', CreateUrlId.as_view(), name='create_url_id'),
]