"use client"
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import FavoriteButton from '../FavoriteButton'
import { useEffect } from 'react'

const PropertyListItem = ({property,markFavorite,loadingFavorite}) => {
    const router=useRouter()
    console.log('MY PROPERTY IMAGE.............',property.image_url)

   
  return (
    <div className='cursor-pointer' onClick={()=>router.push(`/properties/${property.id}`)}>
        <div className='relative overflow-hidden aspect-square rounded-xl'>
            <Image
                fill
                // src={property.image_url || '/images/house1.avif'}
                src={
                    property.image_url
                        ? property.image_url.startsWith('http')
                            ? property.image_url
                            : `${process.env.NEXT_PUBLIC_API_HOST}${property.image_url}`
                        : '/images/house1.avif'
                }
                alt='home image'
                sizes="(max-width: 768px) 768px, (max-width: 1200px) 768px, 768px"
                className='hover:scale-110 object-cover transition h-full w-full'
                unoptimized

            />
            {markFavorite &&(
                <FavoriteButton
                    id={property.id}
                    is_favorite={property.is_favorite}
                    
                    // markFavorite={(is_favorite)=>markFavorite(property.id, is_favorite)}
                    markFavorite={markFavorite}
                    loadingFavorite={loadingFavorite}
                />
            )}
            
        </div>
        <div className='mt-2'>
            <p className='font-bold text-lg'>{property.title}</p>
        </div>
        <div className='mt-2'>
            <p className='text-gray-500 text-sm'><strong>${property.price_per_night}</strong> per night</p>
        </div>
      
    </div>
  )
}

export default PropertyListItem
