from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from ..serializers import RegisteredUsersSerializer, UrlMapperSerializer
from ..utils.mail_utils import send_verification_email
from ..models import RegisteredUsers
import hashlib



class Register(generics.CreateAPIView):
    serializer_class = RegisteredUsersSerializer
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        hashed_password = hashlib.md5(password.encode()).hexdigest()

        if RegisteredUsers.objects.filter(email=email).exists():
            return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)
        data_with_hashed_password = request.data.copy()
        data_with_hashed_password['password'] = hashed_password

        serializer = self.get_serializer(data=data_with_hashed_password)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        instance = serializer.save()
        status = send_verification_email(instance.email)
        return instance