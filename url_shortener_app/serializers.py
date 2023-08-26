from rest_framework import serializers
from .models import RegisteredUsers, UrlMapper
from django.contrib.auth import authenticate
import hashlib


class RegisteredUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegisteredUsers
        fields = ['name', 'password', 'email']
        extra_kwargs = {'password': {'write_only': True}}
class UrlMapperSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
    url_id = serializers.CharField(read_only=True)

    class Meta:
        model = UrlMapper
        fields = '__all__'



