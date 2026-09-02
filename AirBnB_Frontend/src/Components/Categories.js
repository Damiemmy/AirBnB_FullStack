'use client';
import {useState} from 'react'
import Image from 'next/image'
import UseSearchModel, {SearchQuery} from '@/hooks/useSearchModel';

const Categories = () => {
    const searchModal=UseSearchModel()
    const[category,setCategory]=useState('');

    const _setCategory=(_category)=>{
        setCategory(_category)
        const query={
            country : searchModal.query.country,
            checkIn : searchModal.query.checkIn,
            checkOut : searchModal.query.checkOut,
            guests : searchModal.query.guests,
            bedrooms : searchModal.query.bedrooms,
            bathrooms : searchModal.query.bathrooms,
            category : _category
        }

        searchModal.setQuery(query);
    }
  return (
    <div className='flex pt-3 pb-6 space-x-12 mt-3 md:mt-0 items-center cursor-pointer'>
        <div 
            onClick={()=>_setCategory('')}
            className={`flex flex-col space-y-2 pb-4 items-center border-b-2 ${category==""? 'border-black':'border-white'} opacity-60 hover:border-gray-300  hover:opacity-100`}>
            <Image
                src={'/images/icon4.webp'}
                alt='no gkimg'
                width={30}
                height={30}
            />
            <span className='text-xs'>All</span>
        </div>
        <div 
            onClick={()=>_setCategory('Beach')}
            className={`flex flex-col space-y-2 pb-4 items-center ${category=="Beach"? 'border-black':'border-white'} border-b-2 opacity-60 hover:border-gray-300  hover:opacity-100`}>
            <Image
                src={'/images/icon4.webp'}
                alt='no gkimg'
                width={30}
                height={30}
            />
            <span className='text-xs'>Beach</span>
        </div>
        <div 
            onClick={()=>_setCategory('Villas')}
            className={`flex flex-col space-y-2 pb-4 items-center border-b-2 ${category=="Villas"? 'border-black':'border-white'} opacity-60 hover:border-gray-300  hover:opacity-100`}>
            <Image
                src={'/images/icon1.png'}
                alt='no gkimg'
                width={30}
                height={30}
            />
            <span className='text-xs'>Villas</span>
        </div>
        <div 
            onClick={()=>_setCategory('Cabins')}
            className={`flex flex-col space-y-2 pb-4 items-center border-b-2 ${category=="Cabins"? 'border-black':'border-white'} opacity-60 hover:border-gray-300  hover:opacity-100`}>
            <Image
                src={'/images/icon5.png'}
                alt='no gkimg'
                width={30}
                height={30}
            />
            <span className='text-xs'>Cabins</span>
        </div>
        <div 
            onClick={()=>_setCategory('Tiny homes')}
            className={`flex flex-col space-y-2 pb-4 items-center border-b-2 ${category=="Tiny homes"? 'border-black':'border-white'} opacity-60 hover:border-gray-300  hover:opacity-100`}>
            <Image
                src={'/images/icon5.png'}
                alt='no gkimg'
                width={30}
                height={30}
            />
            <span className='text-xs'>Tiny homes</span>
        </div>
       
    </div>
  )
}

export default Categories
