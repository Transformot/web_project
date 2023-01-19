from django.urls import path
from . import views

urlpatterns = [
    path('error', views.error, name='error404-view'),
    path('home/', views.home, name='home-view'),
    path('home/signup/', views.signup, name='signup-ftn'),
    path('home/signin/', views.signin, name='signin-ftn'),
    path('home/signout/', views.signout, name='logout-ftn'),
    path('chat/', views.chat, name='chat-view'),
    path('test/', views.test, name='test-view'),
]

#     path('chat/<str:username>', name='chat-home-view'),
#     path('chat/<slug:username>/<uuid:channel>', name='chat-channel-view'),
