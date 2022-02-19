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
        await self.accept()


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