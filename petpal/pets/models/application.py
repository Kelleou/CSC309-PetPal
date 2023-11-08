from django.db import models
from petpal.pets.models import Pet


class Applications(models.Model):
    firstname = models.CharField(max_length=200)
    lastname = models.CharField(max_length=200)
    email = models.EmailField(max_length=200)
    address = models.CharField(max_length=200)
    pet_listing = models.ForeignKey(Pet, on_delete=models.SET_NULL, null=True)
    reason = models.TextField(max_length=200)
    last_modified = models.DateTimeField(auto_now=True)
    creation_time = models.DateTimeField(auto_now=True)
