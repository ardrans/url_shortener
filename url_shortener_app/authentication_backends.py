from django.contrib.auth.backends import ModelBackend
from .models import RegisteredUsers
import hashlib

class CustomAuthenticationBackend(ModelBackend):
    user_class = RegisteredUsers

    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = self.user_class.objects.get(email=username)
        except self.user_class.DoesNotExist:
            return None
        hashed_password = hashlib.md5(password.encode()).hexdigest()

        if user.password==hashed_password:
            print(user.id)
            return user

        return None
