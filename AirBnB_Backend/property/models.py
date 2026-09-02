from django.db import models
import uuid 
from useraccount.models import User
from django.conf import settings

# Create your models here.
class Property(models.Model):
    id=models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title=models.CharField(max_length=225)
    description=models.TextField()
    price_per_night=models.IntegerField()
    bathroom=models.IntegerField()
    bedroom=models.IntegerField()
    guest=models.IntegerField()
    country=models.CharField(max_length=225)
    country_code=models.CharField(max_length=10)
    categories=models.CharField(max_length=255)
    favourited= models.ManyToManyField(User, related_name='favorites',blank=True)
    image=models.ImageField(upload_to="uploads/properties")
    landlord=models.ForeignKey(User, related_name="properties",on_delete=models.CASCADE)
    created_at=models.DateTimeField(auto_now_add=True)

    # def image_url(self):
    #     if self.image:
    #         return self.image.url
    #     return None
    @property
    def image_url(self):
        """Returns full URL to image, or None if missing"""
        if self.image:
            return self.image.url  # CloudinaryStorage already returns full URL
        return None

class Reservation(models.Model):
    id=models.UUIDField(default=uuid.uuid4,primary_key=True, editable=False)
    property=models.ForeignKey(Property,related_name="reservations", on_delete=models.CASCADE)
    start_date=models.DateField()
    end_date=models.DateField()
    number_of_nights=models.IntegerField()
    guests=models.IntegerField()
    total_price=models.FloatField()
    created_by=models.ForeignKey(User,on_delete=models.CASCADE,related_name="reservations")
    created_at=models.DateTimeField(auto_now_add=True)
