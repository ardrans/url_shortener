from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from ..serializers import RegisteredUsersSerializer, UrlSerializer
from ..utils.mail_utils import send_verification_email


class Register(generics.CreateAPIView):
    serializer_class = RegisteredUsersSerializer
    permission_classes = (AllowAny,)

    def perform_create(self, serializer):
        instance = serializer.save()
        status = send_verification_email(instance.email)
        return instance