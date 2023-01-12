from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.template import Template, Context, loader
from django.urls import reverse
from .models import *


# Create your views here.


def home(request):
    context = {'users': User.objects.count(), 'channels': Channel.objects.count(), 'messages': Message.objects.count()}
    return render(request, 'index.html', context)


def signin(request):
    return HttpResponseRedirect("/chat")


def signup(request):
    return HttpResponseRedirect("/chat")


def chat(request):
    return render(request, 'chat.html')


def test(request):
    users = User.objects.all()

    if not users:
        return HttpResponse("Your database is empty!")
    elif request.session.get('username') is None:
        return HttpResponse("You're not logged in!")

    for user in users:
        if user.username == request.session['username']:
            return HttpResponse("You're connected as {}".format(user))

    return HttpResponse("You're not connected to this service")


def test_logout(request):
    request.session.flush()
    return HttpResponseRedirect("/test")


def test_login(request):
    return render(request, 'test.html')


def test_login_data(request):
    users = User.objects.all()

    for user in users:
        if request.GET.get('username') == user.username:
            if request.GET['password'] == user.password:
                request.session['username'] = user.username
                request.session['password'] = user.password
    return HttpResponse(True)
