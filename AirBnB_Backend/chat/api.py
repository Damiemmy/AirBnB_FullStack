from django.http import JsonResponse
from rest_framework.decorators import api_view
from .models import Conversation,ConversationMessage
from .serializers import ConversationListSerializer,ConversationDetailSerializer,ConversationMessageSerializer
from rest_framework_simplejwt.tokens import AccessToken
from useraccount.models import User


@api_view(['GET'])
def conversation_list(request):
    user = request.user if request.user.is_authenticated else None

    try:
        token=request.META['HTTP_AUTHORIZATION'].split('Bearer ')[1]
        token=AccessToken(token)
        user_id=token.payload['user_id']
        user=User.objects.get(pk=user_id)
    except Exception as e:
        print("TOKEN ERROR:", e)   
        user=None
    
    print('user,', user)
    print("USER:", user)
    serializer=ConversationListSerializer(request.user.conversations.all(),many=True)
    return JsonResponse(serializer.data,safe=False)

@api_view(['GET'])
def conversations_detail(request,pk):
    conversation=request.user.conversations.get(pk=pk)
    conversation_serializer=ConversationDetailSerializer(conversation, many=False)
    messages_serializer=ConversationMessageSerializer(conversation.messages.all(),many=True)
    return JsonResponse({
        'conversation': conversation_serializer.data,
        'messages': messages_serializer.data
    },safe=False)

    
@api_view(['GET'])
def conversation_start(request,user_id):
    print('USER_ID_CONVERSATION',user_id)
    conversations=Conversation.objects.filter(user__in=[user_id]).filter(user__in=(request.user.id))

    if conversation.count() > 0:
        conversation=conversation.first()
        return JsonResponse({'success': True, conversation_id: conversation.id })

    else:
        user= User.objects.get(pk=user_id)
        conversation=Conversation.objects.create()
        conversation.users.add(request.user)
        conversation.users.add(user)
        return JsonResponse({'success': True, conversation_id: conversation.id })



