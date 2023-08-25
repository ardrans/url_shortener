from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import RegisteredUsers, Url


class RegisteredUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegisteredUsers
        fields = ['username', 'password', 'email']
        extra_kwargs = {'password': {'write_only': True}}
class UrlSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source='created_by.id')

    class Meta:
        model = Url
        fields = '__all__'
