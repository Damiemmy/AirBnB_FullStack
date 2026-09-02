import React from 'react'

const CustomButton = ({label,onClick,className}) => {
  return (
    <div onClick={onClick} className={`${className || 'text-white text-center w-full py-4 rounded-xl bg-[#ff385c] hover:bg-[#d50027] cursor-pointer transition' }`}>
        {label}
    </div>
  )
}

export default CustomButton
