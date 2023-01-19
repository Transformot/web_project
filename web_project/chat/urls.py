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
    path('chat_channel/', views.chat_channel, name='chat-channel-view'),
    path('chat/<uuid:uuid>/', views.chat_channel, name='chat-channel-view'),
    path('test/', views.test, name='test-view'),
]
