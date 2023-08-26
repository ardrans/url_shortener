from rest_framework import generics, status
from ..serializers import RegisteredUsersSerializer, UrlMapperSerializer
from ..models import RegisteredUsers, UrlMapper
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import redirect

class CreateUrlId(generics.CreateAPIView):
    queryset = UrlMapper.objects.all()
    serializer_class = UrlMapperSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        url_instance = serializer.save(user_id=self.request.user)
        common_domain = "localhost:8000"
        complete_url = f"https://{common_domain}/{url_instance.url_id}/"
        response_data = {
            "message": "URL created successfully.",
            "complete_url": complete_url
        }
        headers = self.get_success_headers(serializer.data)
        return Response(response_data, status=status.HTTP_201_CREATED, headers=headers)

class RetrieveAndRedirectUrl(generics.RetrieveAPIView):
    queryset = UrlMapper.objects.all()
    serializer_class = UrlMapperSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    lookup_field = 'url_id'
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        return redirect(instance.url)