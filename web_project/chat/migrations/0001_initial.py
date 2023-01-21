# Generated by Django 4.1.3 on 2023-01-21 20:05

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Channel",
            fields=[
                (
                    "uuid",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("name", models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name="User",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("username", models.CharField(max_length=20)),
                ("password", models.CharField(max_length=20)),
                ("connected", models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name="Role",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=20)),
                ("add_user", models.BooleanField()),
                ("ban_user", models.BooleanField()),
                ("rem_user", models.BooleanField()),
                ("rem_message", models.BooleanField()),
                ("not_bannable", models.BooleanField()),
                (
                    "channel",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="roles",
                        to="chat.channel",
                    ),
                ),
                (
                    "users",
                    models.ManyToManyField(
                        blank=True, related_name="roles", to="chat.user"
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Message",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("date", models.DateTimeField()),
                ("data", models.CharField(max_length=300)),
                (
                    "channel",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="messages",
                        to="chat.channel",
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="messages",
                        to="chat.user",
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="channel",
            name="banned",
            field=models.ManyToManyField(
                blank=True, related_name="banned_channels", to="chat.user"
            ),
        ),
        migrations.AddField(
            model_name="channel",
            name="owner",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="owned",
                to="chat.user",
            ),
        ),
        migrations.AddField(
            model_name="channel",
            name="users",
            field=models.ManyToManyField(related_name="channels", to="chat.user"),
        ),
    ]
