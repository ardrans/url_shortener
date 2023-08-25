from django.contrib.auth.backends import ModelBackend
from .models import RegisteredUsers


class CustomAuthenticationBackend(ModelBackend):
    user_class = RegisteredUsers

    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = self.user_class.objects.get(username=username)
        except self.user_class.DoesNotExist:
            return None

        if user.password==password:
            print(user.id)
            return user

        return None
