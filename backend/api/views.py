from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UpdateUserProfileSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken


def get_auth_tokens(user):
    tokens = RefreshToken.for_user(user)
    return {
        'user': UserSerializer(user).data,
        'tokens': {
            'access': str(tokens.access_token),
            'refresh': str(tokens)
        }
    }

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    # list of objects for when we create a new user, ensures we don't recreate an existing user
    queryset = User.objects.all() 

    # tells the view type of data we need to accept
    serializer_class = UserSerializer

    # specifies who can call this view
    permission_classes = [AllowAny] 

class LogInView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if not user:
            return Response(status=401)
        user_data = get_auth_tokens(user)
        return Response(user_data)

class UpdateUserProfileView(APIView):
    permission_classes = [AllowAny]

    def put(self, request, *args, **kwargs):
        user = request.user
        serializer = UpdateUserProfileSerializer(user, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors)
        