import React, { useState } from 'react'
import Modals from './modals'
import UserLoginModal from '@/hooks/UseLoginModal'
import CustomButton from '../Forms/CustomButton'
import UseSignupModal from '@/hooks/useSignupModal'
import { useRouter } from 'next/navigation'
import apiService from '@/services/ApiService'
import { handleLogin } from '@/app/lib/action'

const SignupModal = () => {
  const router=useRouter()
  const signupmodal = UseSignupModal()
  const[email,setEmail]=useState('')
  const[password1,setPassword]=useState('')
  const[password2,setConfirmPassword]=useState('')
  const[error,setError]=useState([])


  const handleSubmit=async()=>{
   
    const formData={
      email: email,
      password1:password1,
      password2:password2,
    }
    const response= await apiService.postWithoutToken('/api/auth/register/',formData)
    console.log('Response:')
    
    if (response.access){
      handleLogin(response.user.pk,response.access,response.refresh);

      signupmodal.closeModal();
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
      <form className='space-y-4 ' action={handleSubmit}>
        <input type='email' onChange={(e)=>setEmail(e.target.value)} placeholder='your e-mail address' className='w-full h-[54px] px-4 border border-gray-300 rounded-xl'/>
        <input type='password'required onChange={(e)=>setPassword(e.target.value)}placeholder='enter your password' className='w-full h-[54px] px-4 border border-gray-300 rounded-xl'/>
        <input type='password'required onChange={(e)=>setConfirmPassword(e.target.value)} placeholder='confirm password' className='w-full h-[54px] px-4 border border-gray-300 rounded-xl'/>

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
      isOpen={signupmodal.isOpen} 
      close={signupmodal.closeModal} 
      label='Sign Up' 
      content={content} 
    />
  )
}

export default SignupModal
