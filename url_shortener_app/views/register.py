from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from ..serializers import RegisteredUsersSerializer, UrlSerializer


class Register(generics.CreateAPIView):
    serializer_class = RegisteredUsersSerializer
    permission_classes = (AllowAny,)