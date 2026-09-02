'use client'
import UserLoginModal from "@/hooks/UseLoginModal"
import { useRouter } from "next/navigation"
import apiService from "@/services/ApiService"

const Contact = ({userId,landlord_id}) => {
  const router = useRouter()
  const loginModal = UserLoginModal()
  const startconversation=async()=>{
    console.log('LANDLORD_ID',landlord_id)
    if(userId){
      const conversation= await apiService.get(`/api/chat/start/${landlord_id}/`)
      console.log('CHECK_CONVERSATION:',conversation)
   
      if(conversation.conversation_id){
        router.push(`/inbox/${conversation.conversation_id}`)
          
      }
    }
  }
  return (
    <div 
      onClick={startconversation}
      className='py-4 px-6 bg-[#ff385c] text-white rounded-xl mt-6 hover:bg-[#d50027] cursor-pointer transition hover:scale-110'
    >
      Contact
    </div>
  )
}

export default Contact
