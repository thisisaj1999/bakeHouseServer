from django.db import models

# Create your models here.

class Signup(models.Model):
    name = models.CharField(max_length=50)
    phone = models.IntegerField(max_length=10)
    email = models.EmailField(max_length=254)
    password = models.CharField(max_length=50)

    def __str__(self):
        return self.name