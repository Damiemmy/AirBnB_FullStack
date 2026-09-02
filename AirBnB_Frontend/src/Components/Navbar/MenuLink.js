import React from 'react'

const MenuLink = ({label,onClick}) => {
  return (
    <div onClick={onClick} className='px-5 py-4 hover:bg-gray-100 transition'>
      {label}
    </div>
  )
}

export default MenuLink
