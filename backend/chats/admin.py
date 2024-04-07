from django.contrib import admin
from .models import Chat, Message, Connection

# Register your models here.

# TODO Remove
admin.site.register(Chat)

admin.site.register(Message)
admin.site.register(Connection)