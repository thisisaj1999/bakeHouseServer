from django import forms
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib import messages
from signin.models import Signup
from signin.forms import CreateUserForm
from django.contrib.auth.forms import UserCreationForm
 

# Create your views here.

def index(request):
    return render(request, 'index.html')



def signup(request):
    context = {}
    if request.method == "POST":
        print("signup POST")
        form = CreateUserForm()
        name = request.POST.get('name')
        phone = request.POST.get('phone')
        email = request.POST.get('email')
        password = request.POST.get('password')
        password1 = request.POST.get('password1')
        

        if password != password1:
            context = {"message" : "password does not match"}
            return render(request, 'signup.html', context)

        # form.email = email
        # form.username = name
        # form.password1 = password
        # form.password2 = password1

        # # print(form.email)
        # print(form.username)
        # print(form.password1)
        # print(form.password2)

        if form.is_valid():
            form.save()
        else:
            print()
            print("form not Valid!!!")
            print()


        signup = Signup(name=name, phone=phone, email=email, password=password)
        signup.save()
        return render(request, 'signup.html', form.errors)


    return render(request, 'signup.html')



def form(request):
    print("formss")
    if request.method == "POST":
        print("posted")
        details = UserCreationForm(request.POST)

        print(details.fields)

        if details.is_valid():
            details.save()
            print("saved")
            return HttpResponse("data submitted successfully")

    form = UserCreationForm


    context = {'form' : form}

    return render(request, 'form.html', context)