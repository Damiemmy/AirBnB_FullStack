import React from 'react'
import Image from 'next/image'
import apiService from '@/services/ApiService'
import Link from 'next/link'


const page = async() => {
    const reservation= await apiService.get('/api/auth/myreservation/')
    console.log(reservation.data)
    
  return (
    <main className='max-w-[1500px] mx-auto px-6 pb-6 '> 
        <h1 className='my-6 text-2xl'> My Reservations</h1>
        <div className='space-y-4'>
            {reservation.map((reservation)=>{

            return(
                <div className='grid grid-col-1 md:grid-cols-4 p-5 shadow-xl rounded-xl border border-gray-300 gap-6'>
                    <div className='col-span-1'>
                        <div className='relative overflow-hidden aspect-square rounded-xl'>
                            <Image
                                fill
                                src={reservation.property.image_url}   
                                alt='image house' 
                                className='hover:scale-110 h-full w-full transition object-cover'
                                unoptimized
                            />

                        </div>
                    </div>
                    <div className=' col-span-1 md:col-span-3 space-y-2'>
                        <h1 className='mb-4 text-xl '>{reservation.property.title}</h1>
                        <p className='opacity-80'><strong>Check in date:</strong> {reservation.start_date}</p>
                        <p className='opacity-80'><strong>Check out date:</strong> {reservation.end_date}</p>
                        <p className='opacity-80'><strong>Number of nights:</strong> {reservation.number_of_nights}</p>
                        <p className='opacity-80'><strong>Total price:</strong> ${reservation.total_price}</p>
                        <Link href={`/properties/${reservation.property.id}`}>
                            <div className='cursor-pointer bg-[#ff385c] py-4 px-6 hover:bg-[#d50027] transition  text-white rounded-xl mt-6 inline-block'> Go to Property
                            </div>
                        </Link>


                    </div>
                </div>
            )})}
            
            
        </div>
        
    </main>
  )
}

export default page
