from rest_framework import serializers
from .models import Chat, Message
from Crypto.Random import get_random_bytes
from Crypto.Cipher import AES
from django.contrib.auth.models import User
from .models import Connection

# TODO REMOVE
class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ["id", "chat_key", "created", "last_used", "members"]
        read_only_fields = ['chat_key']

    def create(self, validated_data):
        members = validated_data.pop('members')
        instance = Chat.objects.create(**validated_data)
        instance.members.set(members)
        instance.chat_key = get_random_bytes(16)
        instance.save()
        return instance
    
class MessageSerializer(serializers.ModelSerializer):
    is_me = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = ["id", "is_me", "timestamp", "message"]
        read_only_fields = ["ciphertext", "tag", "nonce"]

    def create(self, validated_data):
        
        message = validated_data.pop('message').encode()
        chat = validated_data.get('chat')
        key = chat.chat_key.tobytes()
        print(key)
        
        cipher = AES.new(key, AES.MODE_EAX)
        nonce = cipher.nonce
        ciphertext, tag = cipher.encrypt_and_digest(message)
        validated_data['ciphertext'] = ciphertext
        validated_data['tag'] = tag
        validated_data['nonce'] = nonce

        instance = Message.objects.create(**validated_data)
        chat.last_used = instance.timestamp
        chat.save()

        return instance
    
    def get_is_me(self, obj):
        return self.context['user'] == obj.user
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name", "email", "password"]
        extra_kwargs = {
            "password": {"write_only": True},
            "email": {"required": True},
        }    
    
class SearchSerializer(serializers.ModelSerializer):
    status = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['username', 'first_name', 'status']

    def get_status(self, obj):
        if obj.pending_other:
            return 'pending-other'
        elif obj.pending_me:
            return 'pending-me'
        elif obj.connected:
            return 'connected'
        return 'not-connected'
    
class RequestSerializer(serializers.ModelSerializer):
    sender = UserSerializer()
    receiver = UserSerializer()
    
    class Meta:
        model = Connection
        fields = ['id', 'sender', 'receiver', 'created', 'key']

class ConversationSerializer(serializers.ModelSerializer):
    employee = serializers.SerializerMethodField()
    preview = serializers.SerializerMethodField()
    
    class Meta:
        model = Connection
        fields = ['id', 'employee', 'preview', 'updated']

    def get_employee(self, obj):
        # print(f"obj: {obj.sender} {obj.receiver} {self.context['user']}")
        if obj.sender == self.context['user']:
            return UserSerializer(obj.receiver).data
        elif obj.receiver == self.context['user']:
            return UserSerializer(obj.sender).data
        else:
            print('Error: User is not part of this connection')
    
    def get_preview(self, obj):
        return "Preview of conversation"
    

