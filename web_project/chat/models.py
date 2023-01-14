from django.db import models


# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=20)
    connected = models.BooleanField()

    def __str__(self):
        return self.username

    def chg_username(self, username):
        self.username = username
        self.save()
        return self.username

    def chg_password(self, password):
        self.password = password
        self.save()
        return self.password

    def switch(self):
        self.connected = not self.connected
        self.save()
        return self.connected

    def print_state(self):
        if self.connected:
            return "{} : CONNECTED".format(self.username)
        else:
            return "{} : DISCONNECTED".format(self.username)

    def rem(self):
        self.delete()
        return True


class Channel(models.Model):
    name = models.CharField(max_length=20)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="owned")
    users = models.ManyToManyField(User, related_name="channels")
    banned = models.ManyToManyField(User, related_name="banned_channels", blank=True)

    def __str__(self):
        return self.name

    def chg_name(self, name):
        self.name = name
        self.save()
        return self.name

    def chg_owner(self, user):
        self.owner = user
        self.save()
        return user.username

    def add_user(self, user):
        self.users.add(user)
        self.save()
        return user.username

    def rem_user(self, user):
        self.users.remove(user)
        self.save()
        return user.username

    def ban_user(self, user):
        self.users.remove(user)
        self.banned.add(user)
        self.save()
        return user.username

    def unban_user(self, user):
        self.banned.remove(user)
        self.users.add(user)
        self.save()
        return user.username

    def rem(self):
        self.delete()
        return True


class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, related_name="messages", null=True)
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE, related_name="messages")
    date = models.DateTimeField()
    data = models.CharField(max_length=300)

    def __str__(self):
        return self.data

    def chg_data(self, data):
        self.data = data
        self.save()
        return self.data

    def rem(self):
        self.delete()
        return True


class Role(models.Model):
    name = models.CharField(max_length=20)
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE, related_name="roles")
    users = models.ManyToManyField(User, related_name="roles", blank=True)

    add_user = models.BooleanField()
    ban_user = models.BooleanField()
    rem_user = models.BooleanField()
    rem_message = models.BooleanField()
    not_bannable = models.BooleanField()

    def __str__(self):
        return self.name

    def set_perm(self, rights):
        self.add_user = rights[0]
        self.ban_user = rights[1]
        self.rem_user = rights[2]
        self.rem_message = rights[3]
        self.not_bannable = rights[4]
        self.save()
        return

    def rem(self):
        self.delete()
        return True
