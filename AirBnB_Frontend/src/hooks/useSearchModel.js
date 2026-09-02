import React from 'react'
import { create } from 'zustand'

const UseSearchModel = create((set) => ({
  isOpen: false,
  step:'',
  openModal: (step) => set({ isOpen: true ,step:step}),
  closeModal: () => set({ isOpen: false }),
  setQuery: (query) => set({query:query}),
  query:{
    country: '',
    checkIn: null,
    checkOut: null,
    guests: 1,
    bedrooms: 0,
    bathrooms: 0,
    category: '',


  }
}))

export default UseSearchModel

