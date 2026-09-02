from .serializers import UserDetailSerializer
from property.serializers import ReservationListSerializer
from .models import User
from django.http import JsonResponse
from rest_framework.decorators import api_view,authentication_classes,permission_classes


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def landlord_detail(request, pk):
    user = User.objects.get(pk=pk)
    serializers = UserDetailSerializer(user,many=False)
    return JsonResponse(serializers.data, safe=False)

@api_view(['GET'])
def reservation_list(request):
    reservation=request.user.reservations.all()
    serializers= ReservationListSerializer(reservation,many=True)
    return JsonResponse(serializers.data, safe=False)


