import React from 'react'
import Categories from '@/Components/Categories'
import PropertyList from '@/Components/PropertyList/PropertyList'
import { Suspense } from 'react'
import Loading from '@/Loading'

const page = () => {
  return (
    <div className='max-w-[1500px] mx-auto px-6'>
        <Categories/>
        <div className='mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6'>
          <Suspense fallback={<Loading/>}>
            <PropertyList/>
          </Suspense>
        </div>
    </div>
  )
}

export default page
