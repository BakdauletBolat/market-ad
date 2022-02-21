import django
django.setup()

import json
from channels.generic.websocket import WebsocketConsumer
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import UserActivites

class OnlineUserConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.create_activity_login()

        self.room_name = 'main'
        self.room_group_name = 'users_main'

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        
        await self.accept()

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        print(text_data_json)
        user_id = text_data_json['user_id']
        

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'user_id': user_id
            }
        )

    async def chat_message(self, event):
        user_id = event['user_id']
        
        await self.send(text_data=json.dumps({
            'user_id': user_id
        }))
        


    @database_sync_to_async
    def create_activity_login(self):
        user = self.scope["user"]
        UserActivites.objects.create(type='Online',user=user)
    
    @database_sync_to_async
    def create_activity_logout(self):
        user = self.scope["user"]
        UserActivites.objects.create(type='Offline',user=user)

    async def disconnect(self, close_code):
        await self.create_activity_logout()
        pass