from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.
class Chat(models.Model):
    chat_key = models.BinaryField()
    created = models.DateTimeField(auto_now_add=True)
    last_used = models.DateTimeField(default=timezone.now)
    members = models.ManyToManyField(User)

class Message(models.Model):
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE)
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    message = models.CharField(max_length=1000)
    ciphertext = models.BinaryField()
    tag = models.BinaryField()
    nonce = models.BinaryField()

class Connection(models.Model):
    sender = models.ForeignKey(
        User,
        related_name='sent_connections',
        on_delete=models.CASCADE
    )
    receiver = models.ForeignKey(
        User,
        related_name='received_connections',
        on_delete=models.CASCADE
    )
    accepted = models.BooleanField(default=False)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)