from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"] # subject to change
        extra_kwargs = {"password": {"write_only": True}} # no one can read what password is

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user