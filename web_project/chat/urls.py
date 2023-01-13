from django.urls import path
from . import views


urlpatterns = [
    path('home/', views.home, name='home-view'),
    path('home/signup/', views.signup, name='signup-ftn'),
    path('home/signin/', views.signin, name='signin-ftn'),
    path('home/signout/', views.signout, name='logout-ftn'),
    path('chat/', views.chat, name='chat-view'),
    path('test/', views.test, name='test-view'),
]
