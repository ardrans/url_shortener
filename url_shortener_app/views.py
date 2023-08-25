from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from .serializers import RegisteredUsersSerializer, UrlSerializer
from .models import RegisteredUsers, Url
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
import uuid

class Register(generics.CreateAPIView):
    serializer_class = RegisteredUsersSerializer
    permission_classes = (AllowAny,)

class Login(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        try:
            serializer = self.serializer_class(data=request.data, context={'request': request})
            serializer.is_valid(raise_exception=True)
            user = serializer.validated_data['user']
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user_id': user.pk,
                'email': user.email
            })
        except AuthenticationFailed as e:
            print(f"Authentication failed: {str(e)}")
            raise



