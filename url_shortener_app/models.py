from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.models import Group, Permission


class RegisteredUsers(AbstractUser):
    groups = models.ManyToManyField(Group, related_name='url_shortener_users')
    user_permissions = models.ManyToManyField(Permission, related_name='url_shortener_users')
    email = models.EmailField(unique=True)

class Url(models.Model):
    user_id = models.ForeignKey(RegisteredUsers, on_delete=models.CASCADE)
    url = models.URLField(max_length=200)
    url_id = models.CharField(max_length=10, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)




