import React from 'react'
import Image from 'next/image'
import Contact from '@/Components/Contact'
import PropertyList from '@/Components/PropertyList/PropertyList'
import { getUserId } from '@/app/lib/action'
import apiService from '@/services/ApiService'

const page = async({params}) => {
    const id=await params
    const landlordId=id.id
    console.log('PARAMS',landlordId)
    const landlord = await apiService.get(`/api/auth/${landlordId}`)
    const userId=getUserId()
   
    return(
     <main className='max-w-[1500px] mx-auto px-6 pb-6'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            <aside className='col-span-1 mb-4'>
                <div className='flex flex-col p-6 rounded-xl items-center border border-gray-300 shadow-xl'>
                    {/* <Image
                        src={landlord.avatar_url}
                        alt={'no photo'}
                        width={200}
                        height={200}
                        className='rounded-full'
                    /> */}
                    <h1 className='mt-6 text-2xl'>{landlord.name}</h1>
                    {userId != params.id && 
                        <Contact userId={userId} landlord_id={landlordId}/>

                    }
                    

                </div>
            </aside>

            <div className='col-span-1 md:col-span-3 pl-0 md:pl-6'>
                <div className='mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6'>
                   <PropertyList
                    landlord_id={landlordId}
                   />
                </div>
            </div>
        </div>
       
      
    </main>
    )
}

export default page
