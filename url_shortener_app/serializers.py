from rest_framework import serializers
from .models import RegisteredUsers, Url


class RegisteredUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegisteredUsers
        fields = ['username', 'password', 'email']
        extra_kwargs = {'password': {'write_only': True}}
class UrlSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
    url_id = serializers.CharField(read_only=True)

    class Meta:
        model = Url
        fields = '__all__'
