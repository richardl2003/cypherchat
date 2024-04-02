from rest_framework import serializers
from .models import Chat, Message
from Crypto.Random import get_random_bytes
from Crypto.Cipher import AES

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
    class Meta:
        model = Message
        fields = ["id", "chat", "sender", "timestamp", "message"]
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

         

