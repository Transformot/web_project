from django.urls import path
from . import views


urlpatterns = [
    path('home/', views.home, name='home-view'),
    path('home/signin', views.signin, name='home-signin'),
    path('home/signup', views.signup, name='home-signup'),
    path('chat/', views.chat, name='chat-view'),
    path('test/', views.test, name='chat-test'),
    path('test/logout', views.test_logout, name='chat-test_logout'),
    path('test/login', views.test_login, name='login-page'),
    path('test/login/data', views.test_login_data, name='data-page'),
]