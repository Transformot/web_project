from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.template import Template, Context, loader
from django.urls import reverse
from .models import *


# Create your views here.
def home(request):
    return render(request, 'index.html')

