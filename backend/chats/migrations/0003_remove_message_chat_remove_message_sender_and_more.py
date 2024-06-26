# Generated by Django 5.0.4 on 2024-04-07 14:23

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chats', '0002_connection'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveField(
            model_name='message',
            name='chat',
        ),
        migrations.RemoveField(
            model_name='message',
            name='sender',
        ),
        migrations.AddField(
            model_name='connection',
            name='key',
            field=models.BinaryField(default=b'1111'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='message',
            name='connection',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='messages', to='chats.connection'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='message',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='my_messages', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='message',
            name='message',
            field=models.TextField(),
        ),
    ]
