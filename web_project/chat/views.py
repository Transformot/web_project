from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.template import Template, Context, loader
from django.urls import reverse
from .models import *
from uuid import uuid4


# Create your views here.


def verify(username, password):
    users = User.objects.all()

    for user in users:
        if user.username == username:
            return user.password == password

    return False


def get_user(username):
    return User.objects.get(username=username)


def home(request):
    username = request.session.get('username')
    password = request.session.get('password')

    if verify(username, password):
        return HttpResponseRedirect('/chat')

    stats = \
        {
            'users': User.objects.count(),
            'channels': Channel.objects.count(),
            'messages': Message.objects.count()
        }
    return render(request, 'index.html', stats)


def signin(request):
    if request.method == "GET":
        return HttpResponseRedirect('/error')

    username = request.POST.get('username')
    password = request.POST.get('password')

    if verify(username, password):
        request.session['username'] = username
        request.session['password'] = password
        get_user(username).switch()
        request.session.set_expiry(0)
        return HttpResponse(True)

    return HttpResponse(False)


def signup(request):
    if request.method == "GET":
        return HttpResponseRedirect('/error')

    users = User.objects.all()
    username = request.POST.get('username')
    password = request.POST.get('password')

    for user in users:
        if user.username == username:
            return HttpResponse(False)

    User(username=username, password=password, connected=True).save()
    request.session['username'] = username
    request.session['password'] = password
    return HttpResponse(True)


def signout(request):
    username = request.session.get('username')
    if username is not None:
        user = get_user(username)
        if user.connected:
            user.switch()
    request.session.flush()
    return HttpResponseRedirect("/home")


def chat(request):
    username = request.session.get('username')
    password = request.session.get('password')

    if not verify(username, password):
        return HttpResponseRedirect('/error404')

    user = get_user(username)

    context = {
        'list_channel': list(user.channels.all())
    }

    return render(request, 'chat.html', context)


def error(request, exception):
    data = {}
    return render(request, 'error.html', data)


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
