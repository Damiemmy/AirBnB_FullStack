"use client"
import React from 'react'
import UsePropertyModal from '@/hooks/usePropertyModal'

import UserLoginModal from '@/hooks/UseLoginModal'

const AddPropertyButton = ({userId}) => {
  const addPropertyModal=UsePropertyModal()
  const userLoginModal=UserLoginModal()

  const airbnbyourhome=()=>{
    if(userId){
      addPropertyModal.openModal()
    }else{
      userLoginModal.openModal()
    }
    
  }
  return (
    <div 
    onClick={airbnbyourhome}
    className='p-2 cursor-pointer font-semibold mt-1 md:mt-0  text-sm rounded-full hover:border hover:border-[#d38694] bg-gray-200 hover:bg-gray-300 md:bg-white  md:hover:bg-gray-200'>
        Djangobnb your Home
    </div>
  )
}

export default AddPropertyButton
