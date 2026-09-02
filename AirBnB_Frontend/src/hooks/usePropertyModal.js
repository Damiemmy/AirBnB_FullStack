import React from 'react'
import { create } from 'zustand'

const UsePropertyModal = create((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false })
}))

export default UsePropertyModal;