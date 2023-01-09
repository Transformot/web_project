from django.db import models


# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=20)

    def __str__(self):
        return self.username


class Channel(models.Model):
    name = models.CharField(max_length=20)
    creation_date = models.DateField()
    users = models.ManyToManyField(User, related_name="channels")

    def __str__(self):
        return self.name


class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, related_name="messages", null=True)
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE, related_name="messages")
    date = models.DateTimeField()
    data = models.CharField(max_length=300)

    def __str__(self):
        return self.data
