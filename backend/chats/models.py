from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# TODO REMOVE
class Chat(models.Model):
    chat_key = models.BinaryField()
    created = models.DateTimeField(auto_now_add=True)
    last_used = models.DateTimeField(default=timezone.now)
    members = models.ManyToManyField(User)

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
    key = models.BinaryField()

class Message(models.Model):
    connection = models.ForeignKey(Connection, related_name='messages', on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='my_messages', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    message = models.TextField()
    ciphertext = models.BinaryField()
    tag = models.BinaryField()
    nonce = models.BinaryField()

    def __str__(self):
        return self.user.username + ': ' + self.message