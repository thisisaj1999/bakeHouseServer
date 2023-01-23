from django import forms
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib import messages
from signin.models import Signup
from signin.forms import CustomUserCreationForm
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, logout, login
 

# Create your views here.


# login 
def index(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home') 
        else :
            messages.info(request, 'username or password is not valid')
            return render(request, 'index.html')

    return render(request, 'index.html')


# signup 
def signup(request):
    context = {}

    if request.method == "POST":
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            name = form.username_clean()
            phone = request.POST.get('phone')
            email = form.email_clean()
            password = form.clean_password2()

            signup = Signup(name=name, phone=phone, email=email, password=password)
            form.save()
            signup.save()
            messages.success(request, "Account has been created for " + name)
            return render(request, 'index.html')

        else:
            message = "the form is invalid check the username or password!!!"
            context = {'message' : message}
            return render(request, 'signup.html', context)

    form = CustomUserCreationForm()
    context = {'form' : form}

    return render(request, 'signup.html', context)


# home 
def home(request):
    return render(request, 'home.html')