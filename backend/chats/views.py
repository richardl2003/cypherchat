from django.shortcuts import render
from rest_framework import generics
from .models import Chat, Message
from .serializers import ChatSerializer, MessageSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from Crypto.Cipher import AES

# Create your views here.
class CreateChatView(generics.CreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = [AllowAny]

class ChatListView(generics.ListAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user = self.kwargs['user']
        return Chat.objects.filter(members=user).order_by("-last_used")
    
class SendMessageView(generics.CreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [AllowAny]

class ChatLogView(generics.ListAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        cid = self.kwargs['chat']
        log = Message.objects.filter(chat_id=cid).order_by("timestamp")
        chat = Chat.objects.get(id=cid)
        chat_key = chat.chat_key.tobytes()
        for obj in log:
            cipher = AES.new(chat_key, AES.MODE_EAX, nonce=obj.nonce)
            message = cipher.decrypt_and_verify(obj.ciphertext, obj.tag)
            message = message.decode('utf-8')

            obj.message = message
        return log