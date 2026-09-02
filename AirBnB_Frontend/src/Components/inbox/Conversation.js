'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

const Conversation = ({conversation,userId}) => {
  const router=useRouter()
  const otherUser=conversation.users.find((user)=> user.id != userId)
  console.log('OTHER_USER......:', otherUser)
  return (
    <div className='border px-6 py-4 cursor-pointer border-gray-300 rounded-xl  '>
        <p className='mb-6 text-xl'>{otherUser?.email}</p>
        <p 
        onClick={()=>router.push(`/inbox/${conversation.id}`)}
        className='text-[#d50027]'
        >Go to Conversation</p>
    </div>
  )
}

export default Conversation
