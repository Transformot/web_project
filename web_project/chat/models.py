from django.db import models


# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=20)

    def __str__(self):
        return self.username


class Channel(models.Model):
    name = models.CharField(max_length=20)
    users = models.ManyToManyField(User, related_name="channels")
    banned = models.ManyToManyField(User, related_name="banned_channels")

    def __str__(self):
        return self.name


class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, related_name="messages", null=True)
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE, related_name="messages")
    date = models.DateTimeField()
    data = models.CharField(max_length=300)

    def __str__(self):
        return self.data


class State(models.Model):
    connected = models.BooleanField()
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="state")

    def __str__(self):
        if self.connected:
            return "{} : CONNECTED".format(self.user)
        else:
            return "{} : DISCONNECTED".format(self.user)


class Role(models.Model):
    name = models.CharField(max_length=20)
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE, related_name="roles")
    users = models.ManyToManyField(User, related_name="roles")

    def __str__(self):
        return self.name
