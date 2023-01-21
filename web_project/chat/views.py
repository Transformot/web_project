from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.template import Template, Context, loader
from django.urls import reverse
from .models import *
from uuid import uuid4


# Create your views here.

def default(request):
    return HttpResponseRedirect('/home')


def error(request):
    data = {}
    return render(request, 'error.html', data)


def home(request):
    username = request.session.get('username')
    password = request.session.get('password')

    if User.verify(username, password):
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

    if User.verify(username, password):
        request.session['username'] = username
        request.session['password'] = password
        User.get_user(username).switch()
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

    User.create(username, password)
    request.session['username'] = username
    request.session['password'] = password
    request.session.set_expiry(0)
    return HttpResponse(True)


def signout(request):
    username = request.session.get('username')
    if username is not None:
        user = User.get_user(username)
        if user.connected:
            user.switch()
    request.session.flush()
    return HttpResponseRedirect("/home")


def chat(request):
    username = request.session.get('username')
    password = request.session.get('password')

    if not User.verify(username, password):
        return HttpResponseRedirect('/error')

    user = User.get_user(username)

    context = {
        'username': username,
        'list_channels': list(user.channels.all()),
        'nb_channels': user.channels.count(),
    }

    return render(request, 'chat.html', context)


def add_channel(request):
    if request.method == "GET":
        return HttpResponseRedirect('/error')

    username = request.session.get('username')
    password = request.session.get('password')

    if not User.verify(username, password):
        return HttpResponseRedirect('/error')

    user = User.get_user(username)
    name = request.POST.get('name')
    channel = Channel.create(name, user)

    return HttpResponse('/chat/' + str(channel.uuid))


def chg_username(request):
    if request.method == "GET":
        return HttpResponseRedirect('/error')

    username = request.session.get('username')
    password = request.session.get('password')

    if not User.verify(username, password):
        return HttpResponseRedirect('/error')

    users = User.objects.all()
    user = User.get_user(username)
    username = request.POST.get('username')

    for user in users:
        if user.username == username:
            return HttpResponse(False)

    user.chg_username(username)
    request.session['username'] = username

    return HttpResponse(True)


def rem_user(request):
    if request.method == "GET":
        return HttpResponseRedirect('/error')

    username = request.session.get('username')
    password = request.session.get('password')

    if not User.verify(username, password):
        return HttpResponseRedirect('/error')

    user = User.get_user(username)
    password = request.POST.get('password')

    if user.password != password:
        return HttpResponse(False)

    user.rem()

    return HttpResponse(True)


def chat_channel(request, uuid):
    username = request.session.get('username')
    password = request.session.get('password')

    if not User.verify(username, password):
        return HttpResponseRedirect('/error')

    user = User.get_user(username)
    channel = Channel.get_channel_uuid(uuid)

    if not (user in channel.users.all()):
        return HttpResponseRedirect('/error')

    context = {
        'username': user.username,
        'channel_name': channel.name,
        'owner': channel.owner.username,
        'nb_messages': channel.messages.count(),
        'list_channels': list(user.channels.all()),
        'list_members': list(channel.users.all()),
        'list_messages': list(channel.messages.all()),
    }

    return render(request, 'chat_channel.html', context)


def add_message(request, uuid):
    if request.method == "GET":
        return HttpResponseRedirect('/error')

    username = request.session.get('username')
    password = request.session.get('password')

    if not User.verify(username, password):
        return HttpResponseRedirect('/error')

    user = User.get_user(username)
    channel = Channel.get_channel_uuid(uuid)
    data = request.POST.get('data')

    Message.create(user, channel, data)

    return HttpResponse('/chat/' + str(channel.uuid))


def add_user(request, uuid):
    if request.method == "GET":
        return HttpResponseRedirect('/error')

    username = request.session.get('username')
    password = request.session.get('password')

    if not User.verify(username, password):
        return HttpResponseRedirect('/error')

    channel = Channel.get_channel_uuid(uuid)
    added_username = request.POST.get('username')

    if not channel.test_owner(User.get_user(username)):
        return HttpResponse("Not_Owner")

    users = User.objects.all()

    for user in users:
        if user.username == added_username and not(user in channel.banned.all()):
            channel.add_user(user)
            return HttpResponse(True)

    return HttpResponse(False)


def ban_user(request, uuid):
    if request.method == "GET":
        return HttpResponseRedirect('/error')

    username = request.session.get('username')
    password = request.session.get('password')

    if not User.verify(username, password):
        return HttpResponseRedirect('/error')

    channel = Channel.get_channel_uuid(uuid)
    banned_username = request.POST.get('username')

    if not channel.test_owner(User.get_user(username)):
        return HttpResponse("Not_Owner")

    users = channel.users.all()

    for user in users:
        if user.username == banned_username:
            channel.ban_user(user)
            return HttpResponse(True)

    return HttpResponse(False)


def unban_user(request, uuid):
    if request.method == "GET":
        return HttpResponseRedirect('/error')

    username = request.session.get('username')
    password = request.session.get('password')

    if not User.verify(username, password):
        return HttpResponseRedirect('/error')

    channel = Channel.get_channel_uuid(uuid)
    unbanned_username = request.POST.get('username')

    if not channel.test_owner(User.get_user(username)):
        return HttpResponse("Not_Owner")

    users = channel.banned.all()

    for user in users:
        if user.username == unbanned_username:
            channel.unban_user(user)
            return HttpResponse(True)

    return HttpResponse(False)


def rem_user_channel(request, uuid):
    if request.method == "GET":
        return HttpResponseRedirect('/error')

    username = request.session.get('username')
    password = request.session.get('password')

    if not User.verify(username, password):
        return HttpResponseRedirect('/error')

    channel = Channel.get_channel_uuid(uuid)
    rem_username = request.POST.get('username')

    if not channel.test_owner(User.get_user(username)):
        return HttpResponse("Not_Owner")

    users = channel.users.all()

    for user in users:
        if user.username == rem_username:
            channel.rem_user(user)
            return HttpResponse(True)

    return HttpResponse(False)


def leave(request, uuid):
    if request.method == "GET":
        return HttpResponseRedirect('/error')

    username = request.session.get('username')
    password = request.session.get('password')

    if not User.verify(username, password):
        return HttpResponseRedirect('/error')

    user = User.get_user(username)
    channel = Channel.get_channel_uuid(uuid)

    channel.rem_user(user)

    if channel.test_owner(user):
        channel.rem()

    return HttpResponseRedirect('/chat')


def update(request, uuid):
    channel = Channel.get_channel_uuid(uuid)
    count = channel.messages.count()

    new = count

    while new == count:
        new = channel.messages.count()

    return HttpResponse(uuid)
