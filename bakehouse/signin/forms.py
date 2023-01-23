# from django.contrib.auth.forms import UserCreationForm
# from django.contrib.auth.models import User
# from django import forms


# class CreateUserForm(UserCreationForm):

#     email = forms.EmailField(label = "Email")
#     name = forms.CharField(label = "name")

#     class Meta:
#         model = User
#         fields = ("username", "password1", "email", "password2" )

    
#     def save(self, commit=True):
#         user = super(CreateUserForm, self).save(commit=False)
        
#         user.email = self.cleaned_data["email"]
#         user.username = self.cleaned_data["username"]
#         user.name = self.cleaned_data["name"]
#         # user.password1 = self.cleaned_data["password1"]
#         # user.password2 = self.cleaned_data["password2"]
        
#         if commit:
#             user.save()
#         return user




from django import forms  
from django.contrib.auth.models import User  
from django.contrib.auth.forms import UserCreationForm  
from django.core.exceptions import ValidationError  
from django.forms.fields import EmailField  
from django.forms.forms import Form  
  
class CustomUserCreationForm(forms.Form):  
    username = forms.CharField(label='username', min_length=5, max_length=150)  
    email = forms.EmailField(label='email')  
    password1 = forms.CharField(label='password', widget=forms.PasswordInput)  
    password2 = forms.CharField(label='Confirm password', widget=forms.PasswordInput)  

    def getusername(self):
        return self.username

  
    def username_clean(self):  
        username = self.cleaned_data['username'].lower()  
        new = User.objects.filter(username = username)  
        if new.count():  
            raise ValidationError("User Already Exist")  
        return username  
  
    def email_clean(self):  
        email = self.cleaned_data['email'].lower()  
        new = User.objects.filter(email=email)  
        if new.count():  
            raise ValidationError(" Email Already Exist")  
        return email  
  
    def clean_password2(self):  
        password1 = self.cleaned_data['password1']  
        password2 = self.cleaned_data['password2']  
  
        if password1 and password2 and password1 != password2:  
            raise ValidationError("Password don't match")  
        return password2  
  
    def save(self, commit = True):  
        user = User.objects.create_user(  
            self.cleaned_data['username'],  
            self.cleaned_data['email'],  
            self.cleaned_data['password1']  
        )  
        return user






