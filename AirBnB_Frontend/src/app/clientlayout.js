// components/ClientLayout.jsx
"use client"

import { useState } from "react"
import Navbar from "@/Components/Navbar/Navbar";
import Modals from "@/Components/Modals/modals";
import UserLoginModal from "@/hooks/UseLoginModal";
import LoginModal from "@/Components/Modals/LoginModal";
import SignupModal from "@/Components/Modals/SignupModal";
import useSignupModal from "@/hooks/useSignupModal";
import AddPropertyModals from "@/Components/Modals/AddPropertyModals";
import SearchModel from "@/Components/Modals/searchModal";

export default function ClientLayout({ children }) {
  const [open, setOpen] = useState(true)
  const userLoginModal=UserLoginModal()
  const usesignupmodal=useSignupModal()

  return (
    <>
      <div className="pt-32">{children}</div>

      {/* <Modals
        label="Log in"
        content={<p>Hello world</p>}
        isOpen={open}
        close={() => setOpen(false)}
      /> */}
      <LoginModal/>
      <SignupModal/>
      <SearchModel/>
      <AddPropertyModals/>
      
    </>
  )
}
