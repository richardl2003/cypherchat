from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView, LogInView
from chats import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/token/", LogInView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("chats/create", views.CreateChatView.as_view(), name="create_chat"),
    path("chats/chatList/<int:user>", views.ChatListView.as_view(), name="chat_list"),
    path("chats/send", views.SendMessageView.as_view(), name="send_message"),
    path("chats/getLog/<int:chat>", views.ChatLogView.as_view(), name="get_log"),
    path("api-auth/", include("rest_framework.urls"))
]
