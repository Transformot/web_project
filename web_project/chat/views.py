from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from django.template import Template, Context, loader
from django.urls import reverse
from .models import *


# Create your views here.


def verify(username, password):
    users = User.objects.all()

    for user in users:
        if user.username == username:
            return user.password == password

    return False


@csrf_exempt
def home(request):
    stats = {
        'users': User.objects.count(),
        'channels': Channel.objects.count(),
        'messages': Message.objects.count()
    }
    return render(request, 'index.html', stats)


@csrf_exempt
def signin(request):
    username = request.POST.get('username')
    password = request.POST.get('password')

    if verify(username, password):
        request.session['username'] = username
        request.session['password'] = password
        return HttpResponse(True)

    return HttpResponse(False)


@csrf_exempt
def signup(request):
    users = User.objects.all()
    username = request.POST.get('username')
    password = request.POST.get('password')

    for user in users:
        if user.username == username:
            return HttpResponse(False)

    User(username=username, password=password).save()
    request.session['username'] = username
    request.session['password'] = password
    return HttpResponse(True)


def signout(request):
    request.session.flush()
    return HttpResponseRedirect("/home")


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
