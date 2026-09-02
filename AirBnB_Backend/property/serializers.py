from rest_framework import serializers
from .models import Property,Reservation
from useraccount.serializers import UserDetailSerializer

# class PropertySerializer(serializers.ModelSerializer):
#     class Meta:
#         model=Property
#         fields=["id","title","price_per_night","favourited","image_url"]

class PropertySerializer(serializers.ModelSerializer):
    image_url = serializers.ReadOnlyField()  # Works with @property in model

    class Meta:
        model = Property
        fields = ["id", "title", "price_per_night", "favourited", "image_url"]

class PropertyDetailSerializer(serializers.ModelSerializer):
    landlord=UserDetailSerializer(read_only=True,many=False)
    class Meta:
        model=Property
        fields=[
            "id",
            "title",
            "price_per_night",
            "image_url",
            "guest",
            "bedroom",
            "bathroom",
            "landlord"
        ]

class ReservationListSerializer(serializers.ModelSerializer):
    property=PropertySerializer(read_only=True,many=False)
    class Meta:
        model=Reservation
        fields=[
            'id',
            'start_date',
            'end_date',
            'number_of_nights',
            'total_price',
            'property'
        ]