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
import base64


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

class CreateUrlId(generics.CreateAPIView):
    queryset = Url.objects.all()
    serializer_class = UrlSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        url_instance = serializer.save(user_id=self.request.user)
        common_domain = "urlshortener.com"
        complete_url = f"https://{common_domain}/{url_instance.url_id}/"
        response_data = {
            "message": "URL created successfully.",
            "complete_url": complete_url
        }
        headers = self.get_success_headers(serializer.data)
        return Response(response_data, status=status.HTTP_201_CREATED, headers=headers)


