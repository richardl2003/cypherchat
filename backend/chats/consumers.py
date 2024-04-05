from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
import json

class ChatConsumer(WebsocketConsumer):

    def connect(self):
        user = self.scope['user']
        print(user, user.is_authenticated)
        if not user.is_authenticated:
            return
        # self.username = user.username
        # async_to_sync(self.channel_layer.group_add)(
        #     self.username, self.channel_name
        # )

        self.accept()

    def disconnect(self, close_code):
        # async_to_sync(self.channel_layer.group_discard)(
        #     self.username, self.channel_name
        # )
        pass

    def receive(self, text_data):
        # Get json from websocket
        res = json.loads(text_data)
        print('receive', json.dumps(res, index=2))
