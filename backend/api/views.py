from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    # list of objects for when we create a new user, ensures we don't recreate an existing user
    queryset = User.objects.all() 

    # tells the view type of data we need to accept
    serializer_class = User

    # specifies who can call this view
    permission_classes = [AllowAny] 