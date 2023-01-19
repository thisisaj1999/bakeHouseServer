from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms


class CreateUserForm(UserCreationForm):
    class meta:
        model = User
        fields = ['password1', 'password2','username' ]
