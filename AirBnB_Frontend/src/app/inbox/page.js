import Conversation from '@/Components/inbox/Conversation'
import apiService from '@/services/ApiService'
import { getUserId } from '../lib/action'

const page = async() => {
  const userId= await getUserId()
  if(!userId){
    return(
        <main className="max-w-[1500px] max-auto px-6 py-12">
            <p>You need to be Authenticated...</p>
        </main>
    )
  }
    const conversation=await apiService.get('/api/chat/')
    console.log('RESPONSE..: ', conversation)
    console.log('USERID..: ', userId)

  
  




  return (
    <main className='max-w-[1500px] px-6 pb-6 mx-auto space-y-4'>
        <h1 className='py-6 text-2xl'>Inbox</h1>
             {conversation.map((conversation)=>{
              return(
                <Conversation
                key={conversation.id}
                conversation={conversation}
                userId={userId}
                />
              )
            })} 
              
      
    </main>
  )
}

export default page
