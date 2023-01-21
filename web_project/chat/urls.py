from django.urls import path
from . import views

urlpatterns = [
    path('', views.default, name="default-view"),
    path('error', views.error, name='error-view'),
    path('home/', views.home, name='home-view'),
    path('home/signup/', views.signup, name='signup-ftn'),
    path('home/signin/', views.signin, name='signin-ftn'),
    path('home/signout/', views.signout, name='logout-ftn'),
    path('chat/', views.chat, name='chat-view'),
    path('chat/add_channel/', views.add_channel, name='view-add_channel'),
    path('chat/chg_username/', views.chg_username, name='view-chg_username'),
    path('chat/rem_user/', views.rem_user, name='view-rem_user'),
    path('chat/<uuid:uuid>/', views.chat_channel, name='chat-channel-view'),
    path('chat/<uuid:uuid>/add_message/', views.add_message, name='chat-channel-add_msg-view'),
    path('chat/<uuid:uuid>/add_user/', views.add_user, name='chat-channel-add_user-view'),
    path('chat/<uuid:uuid>/ban_user/', views.ban_user, name='chat-channel-ban_user-view'),
    path('chat/<uuid:uuid>/unban_user/', views.unban_user, name='chat-channel-unban_user-view'),
    path('chat/<uuid:uuid>/rem_user_channel/', views.rem_user_channel, name='chat-channel-rem_user_channel-view'),
    path('chat/<uuid:uuid>/leave/', views.leave, name='chat-channel-leave-view'),
    path('chat/<uuid:uuid>/update/', views.update, name='chat-channel-update-view'),
]
