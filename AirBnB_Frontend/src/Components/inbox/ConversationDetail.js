'use client'
import React, { useEffect, useState,useRef } from 'react'
import CustomButton from '../Forms/CustomButton'
import useWebSocket from 'react-use-websocket'

const ConversationDetail = ({conversation,userId,token,messages}) => {
  const messageDiv=useRef(null)
  const[realTimeMessages,setRealTimeMessages]=useState([])
  const [newMessage,setNewMessage]=useState('')
  const myUser=conversation?.conversation?.users?.find((user)=> user.id == userId)
  const otherUser=conversation?.conversation?.users?.find((user)=> user.id != userId)
  console.log('CONVERSATION',conversation.conversation.id)
  console.log('CONVERSATION_USER',myUser)
  console.log('CONVERSATION_OTHERUSER', otherUser)
  console.log('CONVERSATION_OTHERUSER', otherUser)
  console.log('CONVERSATIONMESSAGES', messages)

  const{sendJsonMessage,lastJsonMessage,readyState}= useWebSocket(`ws://127.0.0.1:8000/ws/${conversation.conversation.id}/?token=${token}`,
    {
      share: false,
      shouldReconnect: () => true,
    },
  )

  useEffect(()=>{
    console.log('connection state changed',readyState);
  },[readyState])


  useEffect(()=>{
    if(lastJsonMessage && typeof lastJsonMessage === 'object' && 'name' in lastJsonMessage){
      const message= {
        id: '',
        name: lastJsonMessage.name,
        body: lastJsonMessage.body,
        sent_to: otherUser,
        created_by: myUser,
        conversationId: conversation.conversation.id
      }
      setRealTimeMessages((realTimeMessages)=>[...realTimeMessages, message]
      );
    }
    scrollToBottom();

  }, [lastJsonMessage])

  const sendMessage=()=>{
     if (!newMessage.trim()) return;

    if (!conversation?.conversation?.id || !otherUser?.id || !myUser?.name) {
      console.log("Missing required data ❌");
      return;
    }
    console.log('sendMessage')
    console.log({
      body: newMessage,
      name: myUser?.name,
      sent_to_id: otherUser?.id,
      conversation_id: conversation.conversation.id
    })
    sendJsonMessage({
      event: 'chat_message',
      data:{
        body: newMessage,
        name: myUser?.name,
        sent_to_id: otherUser?.id,
        conversation_id: conversation.conversation.id
      }
    })
     setNewMessage('')
     setTimeout(()=>{
      scrollToBottom()
     },50)
  }
  
  const scrollToBottom=()=>{
    if (messageDiv.current){
      messageDiv.current.scrollTop = messageDiv.current.scrollHeight
  }}

  return (
    <div 
      ref={messageDiv}
      className='max-h-[400px] overflow-auto flex flex-col space-y-4'
    >
      {/* <div className='bg-gray-200 rounded-xl px-6 py-4 w-[80%]'>
        <p className='font-bold text-gray-500'>John Doe</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, ipsam?</p>
      </div>
      <div className='bg-blue-200 rounded-xl ml-[20%] px-6 py-4 w-[80%]'>
        <p className='font-bold text-gray-500'>Damisa Emmanuel</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, ipsam?</p>
      </div> */}
      {messages.map((message,index)=>(
        <div
          key={index}
          className={`w-[80%] rounded-xl px-6 py-4 ${message.created_by.name === myUser?.name ? 'ml-[20%] bg-blue-200': 'bg-gray-200' }`}
        >
          <p className='font-bold text-gray-500'>{message.created_by.name}</p>
          <p>{message.body}</p>

        </div>

      ))}
      {realTimeMessages.map((message,index)=>(
        <div
          key={index}
          className={`w-[80%] rounded-xl px-6 py-4 ${message.name === myUser?.name ? 'ml-[20%] bg-blue-200': 'bg-gray-200' }`}
        >
          <p className='font-bold text-gray-500'>{message.name}</p>
          <p>{message.body}</p>

        </div>

      ))}

      <div className='mt-4 px-6 py-4 flex border items-center border-gray-300 space-x-4 rounded-xl'>
        <input
          type='text'
          placeholder='type your message...'
          className='w-full rounded-xl py-4 px-6 bg-gray-200'
          value={newMessage}
          onChange={(e)=>setNewMessage(e.target.value)}
        />
        <CustomButton 
        onClick={sendMessage}
        label='Send'/>
        

      </div>

      
      
    </div>
  )
}

export default ConversationDetail
