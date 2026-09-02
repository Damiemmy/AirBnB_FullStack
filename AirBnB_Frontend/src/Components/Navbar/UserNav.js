"use client"
import React from 'react'
import { useState } from 'react'
import MenuLink from './MenuLink'
import UserLoginModal from '@/hooks/UseLoginModal'
import LoginModal from '../Modals/LoginModal'
import UseSignupModal from '@/hooks/useSignupModal'
import LogoutButton from '../LogoutButton'
import { useRouter } from 'next/navigation'

const UserNav = ({userId}) => {
  const loginModal=UserLoginModal()
  const signupmodal=UseSignupModal()
  const [isOpen,setIsOpen]=useState(false)
  const router=useRouter()
  return (
    <div className='relative p-2 inline-block border border-gray-200 rounded-full'>
        <button onClick={()=>setIsOpen(!isOpen)} className='flex px-2 items-center'>
            {isOpen===false ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </>
              ):(<h1 className='text-2xl font-bold text-black'>X</h1>)
            }
              {isOpen && (
                <div className='w-[220px] bg-white border-gray-200 flex flex-col absolute text-black top-[50px] right-[0] border rounded-xl cursor-pointer shadow-md text-left'>
                  {userId ? (
                    <>
                      <MenuLink
                      label='My Inbox'
                      onClick={()=>{
                      console.log('clicked MyInbox button')
                      setIsOpen(false)
                        router.push(`/inbox/`)}}

                      />
                      <MenuLink
                      label='My properties'
                      onClick={()=>{
                      console.log('clicked Myproperties button')
                      setIsOpen(false)
                        router.push(`/myproperties/`)}}

                      />
                      <MenuLink
                      label='My Favourites'
                      onClick={()=>{
                      console.log('clicked MyFavourite button')
                      setIsOpen(false)
                        router.push(`/myfavourites/`)}}

                      />
                      <MenuLink
                      label='My Reservation'
                      onClick={()=>{
                      console.log('clicked MyFavourite button')
                      setIsOpen(false)
                        router.push(`/myreservations/`)}}

                      />
                      <LogoutButton/>
                    </>
                    ):(
                    <>
                      <MenuLink label='Log in' onClick={()=>{
                      console.log('clicked login button')
                      loginModal.openModal()
                    
                      }}/>
                      <MenuLink label='Sign up' 
                      onClick={()=>{
                      console.log('clicked sign up button')
                      signupmodal.openModal()}}/>
                    </>
                  )}
                  
                    
                </div>
              )}
            
        </button>


     
    </div>
  )
}

export default UserNav
