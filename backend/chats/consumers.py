from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from django.contrib.auth.models import User
from django.db.models import Q, Exists, OuterRef
import json
from .models import Connection, User, Message
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes 

from .serializers import (
    SearchSerializer,
    RequestSerializer,
    ConversationSerializer,
    MessageSerializer,
    UserSerializer
)

class ChatConsumer(WebsocketConsumer):  

    def connect(self):
        user = self.scope['user']
        print(user, user.is_authenticated)
        if not user.is_authenticated:
            return
        self.username = user.username
        async_to_sync(self.channel_layer.group_add)(
            self.username, self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.username, self.channel_name
        )

    def receive(self, text_data):
        # Get json from websocket
        res = json.loads(text_data)
        print('receive', json.dumps(res, indent=2))

        # Get type of request
        source = res.get('source')
        handlers = {
            'search': self.receive_search,
            'request_connect': self.receive_request_connect,
            'request_list': self.receive_request_list,
            'request_accept': self.receive_request_accept,
            'conversation_list': self.conversation_list,
            'message_list': self.receive_message_list,
            'message_type': self.receive_message_type,
            'message_send': self.receive_message_send
        }           
        
        handler = handlers.get(source)
        handler(res)

    ###### HELPER FUNCTIONS #####

    def decrypt_messages(self, messages, message_key):
        for obj in messages:
            cipher = AES.new(message_key, AES.MODE_EAX, nonce=obj.nonce)
            message = cipher.decrypt_and_verify(obj.ciphertext, obj.tag)
            message = message.decode('utf-8')

            obj.message = message
        return messages
   
    ##### REQUEST HANDLERS #####

    def receive_search(self, data):
        query = data.get('query')
        users = User.objects.filter(
            Q(username__istartswith=query) |
            Q(first_name__istartswith=query) |
            Q(last_name__istartswith=query)
        ).exclude(
            username=self.username
        ).annotate(
            pending_other=Exists(
                Connection.objects.filter(
                    sender=self.scope['user'],
                    receiver=OuterRef('id'),
                    accepted=False
                )
            ),
            pending_me=Exists(
                Connection.objects.filter(
                    sender=OuterRef('id'),
                    receiver=self.scope['user'],
                    accepted=False
                )
            ),
            connected=Exists(
                Connection.objects.filter(
                    Q(sender=self.scope['user'], receiver=OuterRef('id')) |
                    Q(sender=OuterRef('id'), receiver=self.scope['user']),
                    accepted=True
                )
            )
        )
        serialized = SearchSerializer(users, many=True)
        self.send_group(self.username, 'search', serialized.data) 

    def receive_request_connect(self, data):
        username = data.get('username')
        try:
            receiver = User.objects.get(username=username)
        except User.DoesNotExist:
            return
        connection, _ = Connection.objects.get_or_create(
            sender=self.scope['user'],
            receiver=receiver,
            key=get_random_bytes(16)
        )
        serialized = RequestSerializer(connection)

        self.send_group(connection.sender.username, 'request_connect', serialized.data)
        self.send_group(connection.receiver.username, 'request_connect', serialized.data)

    def receive_request_list(self, data):
        user = self.scope['user']
        connections = Connection.objects.filter(
            receiver=user,
            accepted=False
        )
        serialized = RequestSerializer(connections, many=True)
        self.send_group(user.username, 'request_list', serialized.data)

    def receive_request_accept(self, data):
        username = data.get('username')
        try:
            connection = Connection.objects.get(
                sender__username=username,
                receiver=self.scope['user']
            )
        except Connection.DoesNotExist:
            print("Error: Connection does not exist")
            return
        connection.accepted = True
        connection.save()
        serialized = RequestSerializer(connection)
        self.send_group(connection.sender.username, 'request_accept', serialized.data)
        self.send_group(connection.receiver.username, 'request_accept', serialized.data)

    def conversation_list(self, data):
        user = self.scope['user']
        connections = Connection.objects.filter(
            Q(sender=user) | Q(receiver=user),
            accepted=True
        )
        serialized = ConversationSerializer(connections, context={'user': user}, many=True)
        self.send_group(user.username, 'conversation_list', serialized.data)

    def receive_message_list(self, data):
        user = self.scope['user']
        connectionId = data.get('connectionId')
        page = data.get('page')
        page_size = 15
        try:
            connection = Connection.objects.get(id=connectionId)
        except Connection.DoesNotExist:
            print("Error: could not find connection")
            return
        
        messages = Message.objects.filter(connection=connection).order_by("-timestamp")[page*page_size : (page+1)*page_size]
        message_key = connection.key.tobytes()

        messages = self.decrypt_messages(messages, message_key)
        serialized_messages = MessageSerializer(
            messages,
            context = {'user': user},
            many=True
        )

        recipient = connection.sender
        if recipient == user:
            recipient = connection.receiver

        serialized_recipient = UserSerializer(recipient)

        message_count = Message.objects.filter(connection=connection).count()
        next_page = page + 1 if message_count > (page + 1) * page_size else None

        data = {
            'messages': serialized_messages.data,
            'next': next_page,
            'recipient': serialized_recipient.data
        }

        self.send_group(user.username, 'message_list', data)

    def receive_message_type(self, data):
        user = self.scope['user']
        recipient = data.get('username')
        data = {
            'user': user.username
        }
        self.send_group(recipient, 'message_type', data)
    
    def receive_message_send(self, data):
        user = self.scope['user']
        connectionId = data.get('connectionId')
        message_text = data.get('message')
        try:
            connection = Connection.objects.get(id=connectionId)
        except Connection.DoesNotExist:
            print("Error: could not find connection")
            return

        message_encoded = message_text.encode()
        chat_key = connection.key.tobytes()
        cipher = AES.new(chat_key, AES.MODE_EAX)
        nonce = cipher.nonce
        ciphertext, tag = cipher.encrypt_and_digest(message_encoded)

        message = Message.objects.create(
            connection=connection,
            user=user,
            ciphertext=ciphertext,
            nonce=nonce,
            tag=tag
        )

        message.message = message_text

        recipient = connection.sender
        if recipient == user:
            recipient = connection.receiver

        serialized_recipient = UserSerializer(recipient)
        serialized_message = MessageSerializer(
            message,
            context={'user': user}
        )
        data = {
            'message': serialized_message.data,
            'recipient': serialized_recipient.data
        }
        self.send_group(user.username, 'message_send', data)
        
        serialized_recipient = UserSerializer(user)
        serialized_message = MessageSerializer(
            message,
            context={'user': recipient}
        )
        data = {
            'message': serialized_message.data,
            'recipient': serialized_recipient.data
        }
        self.send_group(recipient.username, 'message_send', data)


        


    def send_group(self, group, source, data):
        response = {
            'type': 'broadcast_group',
            'source': source,
            'data': data
        }
        async_to_sync(self.channel_layer.group_send)(
            group, response
        )
    def broadcast_group(self, data):
        data.pop('type')
        self.send(text_data=json.dumps(data))   



