import React from 'react'
import Image from 'next/image'
import ReservationSidebar from '@/Components/PropertyList/ReservationSidebar'
import apiService from '@/services/ApiService'
import { getUserId } from '@/app/lib/action'
import Link from 'next/link'

const page = async({params}) => {
  const INTERNAL_API_URL = process.env.INTERNAL_API_URL
  const id=await params
  const propertiesId = id.id 
  const property=await apiService.get(`${INTERNAL_API_URL || " "}/api/properties/${propertiesId}`)
  const userId=await getUserId()
  console.log("UserId", userId)
  return (
    <main className='max-w-[1500px] mx-auto px-6 pb-6'>
      <div className='relative w-full h-[64vh] overflow-hidden rounded-xl'>
        <Image
            fill
            src={property.image_url}
            alt='No ProperDetail Image'
            className='w-full h-full object-cover'
            unoptimized
        />

      </div>
      <div className='pt-4 grid grid-cols-1 md:grid-cols-5 gap-4'>
        <div className='py-6 pr-6 col-span-3'>
            <h1 className='mb-4 text-4xl'>{property.title}</h1>
            <span className='mb-6 block text-gray-600 text-lg'>{property.guest} guest - {property.bedroom} bedroom -{property.bathroom} bathroom</span>
            <hr className='text-gray-300'/>
            <Link href={`/landlord/${property.landlord.id}`}>
            <div className='py-6 flex items-center space-x-4'>
                {property.landlord.avatar_url? 
                  
                    (<Image
                    src={property.landlord.avatar_url}
                    width={50}
                    height={50}
                    className='rounded-full'
                    alt='no image'
                    />):(
                    <Image
                    src={'/damisaa.jfif'}
                    width={50}
                    height={50}
                    className='rounded-full'
                    alt='no image'
                    />
                    )
                  
                }
                
                <p className='opacity-80'><strong>{property.landlord.name}</strong> is your host</p>

                <hr/>
            </div>
            </Link>
            <div className='mt-6 text-lg'>
                    {property.description}
            </div>
        </div>
        <ReservationSidebar property={property} userId={userId}/>
        
      </div>
    </main>
  )
}

export default page
