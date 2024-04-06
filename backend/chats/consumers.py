from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from django.contrib.auth.models import User
from django.db.models import Q
from .serializers import SearchSerializer, RequestSerializer
import json
from .models import Connection

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
        handler = AbstractHandlerFactory().handlers.get(source)

        # Process the request
        serialized_response = handler(res, self.scope['user']).handle()

        # Send back to the user
        self.send_group(self.username, source, serialized_response.data)

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

# OOP For handling the different requests 
class AbstractHandler:
    def handle(self):
        pass

class AbstractHandlerFactory:
    def __init__(self):
        self.handlers = {
            'search': SearchHandler,
            'request_connect': RequestConnectHandler 
        }

class SearchHandler(AbstractHandler):
    def __init__(self, data, current_user):
        self.data = data
        self.current_user = current_user
    def handle(self):
        query = self.data.get('query')
        users = User.objects.filter(
            Q(username__istartswith=query) |
            Q(first_name__istartswith=query) |
            Q(last_name__istartswith=query)
        ).exclude(
            username=self.current_user.username
        )
        serialized = SearchSerializer(users, many=True)
        return serialized

class RequestConnectHandler(AbstractHandler):
    def __init__(self, data, current_user):
        self.data = data
        self.current_user = current_user
    def handle(self):
        username = self.data.get('username')
        try:
            receiver = User.objects.get(username=username)
        except User.DoesNotExist:
            print("Error: User does not exist")
            return
        connection, _ = Connection.objects.get_or_create(
            sender=self.current_user,
            receiver=receiver
        )
        serialized = RequestSerializer(connection)
        return serialized




