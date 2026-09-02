import React, { useState } from 'react'
import Modals from './modals'
import UserLoginModal from '@/hooks/UseLoginModal'
import CustomButton from '../Forms/CustomButton'
import apiService from '@/services/ApiService'
import { handleLogin } from '@/app/lib/action'
import { useRouter } from 'next/navigation'


const LoginModal = () => {
  const loginmodal = UserLoginModal()
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const[error,setError]=useState([])
  const router=useRouter()

  const formData={
    email:email,
    password:password,
  }

  const handleSubmit=async()=>{
    const response= await apiService.postWithoutToken("/api/auth/login/",formData)
    if(response.access){
      handleLogin(response.user.pk,response.access,response.refresh)
      console.log(response.data)
      loginmodal.closeModal()
      router.push('/')
    }else{
      const tmpErrors=Object.values(response).map((error)=>{
        return error;
      })
      setError(tmpErrors);
    }
  }

  const content = [
    <>
      
      <form className='space-y-4 ' onSubmit={handleSubmit}>
        <input type='email' onChange={(e)=>setEmail(e.target.value)} placeholder='your e-mail address' className='w-full h-[54px] px-4 border border-gray-300 rounded-xl'/>
        <input type='password' onChange={(e)=>setPassword(e.target.value)} placeholder='enter your password' className='w-full h-[54px] px-4 border border-gray-300 rounded-xl'/>
        {error.map((error, index)=>{
          return(
            <div key={`error_${index}`} className='p-5 bg-[#ff385c] text-white rounded-xl opacity-80'>{error}</div>
          )
        })}

        <CustomButton
        label='submit'
        onClick={handleSubmit}/>

      </form>
    </>
    
  ]

  return (
    <Modals 
      isOpen={loginmodal.isOpen} 
      close={loginmodal.closeModal} 
      label='Log In' 
      content={content} 
    />
  )
}

export default LoginModal
