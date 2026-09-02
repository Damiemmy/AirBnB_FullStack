from django.http import JsonResponse
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework_simplejwt.tokens import AccessToken
from .forms import PropertyForm
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from django.shortcuts import get_object_or_404

from .models import Property,Reservation
from .serializers import PropertySerializer,PropertyDetailSerializer,ReservationListSerializer
from useraccount.models import User

# @api_view(['GET'])
# @authentication_classes([])
# @permission_classes([])
# def properties_list(request):

#     print("AUTH HEADER:", request.META.get("HTTP_AUTHORIZATION"))  # 👈 Add it here
#     #
#     # Auth

#     try:
#         token=request.META['HTTP_AUTHORIZATION'].split('Bearer ')[1]
#         token=AccessToken(token)
#         user_id=token.payload['user_id']
#         user=User.objects.get(pk=user_id)
#     except Exception as e:
#         print("TOKEN ERROR:", e)   # 👈 ADD THIS
#         user=None
    
#     print('user,', user)
#     print("USER:", user)

#     #
#     #Filter

#     favorites=[]
#     properties = Property.objects.all()

#     #
#     #Filter

#     landlord_id = request.GET.get('landlord_id','')
#     if landlord_id:
#        properties= properties.filter(landlord_id=landlord_id)

#     #
#     #Favourite

#     if user:
#         for property in properties:
#             if user in property.favourited.all():
#                 favorites.append(property.id)

#     print('favourites',favorites)      
#     #
#     #
#     serializer=PropertySerializer(properties,many=True)
#     return JsonResponse({
#         'data':serializer.data,
#         'favorites':favorites
#     })


@api_view(['GET'])
def properties_list(request):

    user = request.user if request.user.is_authenticated else None
    favorites = []
    properties = Property.objects.all()
    ##
    is_favorites=request.GET.get('is_favorites','')
    landlord_id = request.GET.get('landlord_id', '')
    ##
    country=request.GET.get('country','')
    category=request.GET.get('category','')
    checkin_date=request.GET.get('checkIn','')
    checkout_date=request.GET.get('checkOut','')
    guests=request.GET.get('numGuests','')
    bedrooms=request.GET.get('numBedrooms','')
    bathrooms=request.GET.get('numBathrooms','')
    ##
    print ('COUNTRY',country)
    ## filter_start
    
    if checkin_date and checkout_date:
        exact_matches = Reservation.objects.filter(start_date = checkin_date) | Reservation.objects.filter(end_date=checkout_date)
        overlap_matches= Reservation.objects.filter(start_date__lte = checkout_date, end_date__gte=checkin_date)
        all_matches=[]

        for reservation in exact_matches | overlap_matches:
            all_matches.append(reservation.property.id)
        properties = properties.exclude(id__in = all_matches)

    if landlord_id:
        properties = properties.filter(landlord_id=landlord_id)

    if is_favorites:
        properties=properties.filter(favourited__in=[user])
    ##
    if guests:
        properties=properties.filter(guest__gte=guests)
    if bedrooms:
        properties=properties.filter(bedroom__gte=bedrooms)
    if bathrooms:
        properties=properties.filter(bathroom__gte=bathrooms)
    if country:
        properties=properties.filter(country=country)
    if category and category != 'undefined':
        properties=properties.filter(categories=category)

    
    ## filter end

    if user:
        favorites = list(
            Property.objects.filter(favourited=user)
            .values_list('id', flat=True)
        )

    serializer = PropertySerializer(properties, many=True)

    return JsonResponse({
        "data": serializer.data,
        "favorites": favorites
    })

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def properties_detail(request,pk):
    single_property=Property.objects.get(pk=pk)
    serializer=PropertyDetailSerializer(single_property, many=False)
    return JsonResponse(serializer.data)



@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def properties_reservation(request,pk):
    single_property=Property.objects.get(pk=pk)
    reservations=single_property.reservations.all()
    serializer=ReservationListSerializer(reservations,many=True)
    return JsonResponse(serializer.data,safe=False)
    



@api_view(["POST","FILES"]) 
def create_property(request):
    print("POST:", request.POST)
    print("FILES:", request.FILES)

    form=PropertyForm(request.POST,request.FILES)

    if form.is_valid():
        property=form.save(commit=False)
        property.landlord=request.user
        property.save()
        return JsonResponse({'success':True})
    else:
        print('error',form.errors,form.non_field_errors)
        return JsonResponse({'errors': form.errors.as_json()},status=400 )

@api_view(['POST'])
def book_property(request,pk):
    try:
        start_date= request.POST.get('start_date','')
        end_date=request.POST.get('end_date','')
        number_of_nights=request.POST.get('number_of_nights','')
        total_price=request.POST.get('total_price','')
        guests=request.POST.get('guests','')

        property=Property.objects.get(pk=pk)
        Reservation.objects.create(
            property=property,
            guests=guests,
            end_date=end_date,
            start_date=start_date,
            total_price=total_price,
            number_of_nights=number_of_nights,
            created_by=request.user
        )
        return JsonResponse({"success":True})



    except Exception as e:
        print("Error",e)
        
        return JsonResponse({'success': False})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_favorite(request, pk):
    property = get_object_or_404(Property, pk=pk)
    if request.user in property.favourited.all():
        property.favourited.remove(request.user)
        return JsonResponse({'is_favourite': False})
    else:
        property.favourited.add(request.user)
        return JsonResponse({'is_favourite': True})
    