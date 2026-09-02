'use client'
import UseSearchModel from '@/hooks/useSearchModel'

const SearchFilters = () => {
    const searchModel=UseSearchModel()
  return (
    <div 
    onClick={()=>searchModel.openModal('location')}
    className='h-[48px] lg:h-[64px] flex flex-row justify-between items-center border border-gray-200 rounded-full'>
        <div className='hidden lg:block'>
            <div className='flex flex-row justify-between items-center'>
                <div className='cursor-pointer w-[250px] h-[48px] lg:h-[64px] px-8 flex flex-col justify-center rounded-full hover:bg-gray-300'>
                    <p className='text-xs font-semibold'>Where</p>
                    <p className='text-sm'>Wanted location</p>
                </div>
                <div className='cursor-pointer h-[48px] lg:h-[64px] px-8 flex flex-col justify-center rounded-full hover:bg-gray-300'>
                    <p className='text-xs font-semibold'>Check in</p>
                    <p className='text-sm'>Add dates</p>
                </div>
                <div className='cursor-pointer h-[48px] lg:h-[64px] px-8 flex flex-col justify-center rounded-full hover:bg-gray-300'>
                    <p className='text-xs font-semibold'>Check out</p>
                    <p className='text-sm'>Add dates</p>
                </div>
                <div className='cursor-pointer h-[48px] lg:h-[64px] px-8 flex flex-col justify-center rounded-full hover:bg-gray-300'>
                    <p className='text-xs font-semibold'>Who?</p>
                    <p className='text-sm'>Add guests</p>
                </div>

            </div>
        </div>
        <div className='p-2'>
            <div className='cursor-pointer p-2 lg:p-4 bg-[#ff385c] rounded-full text-white hover:bg-[#d50027] transition'>
                <svg
                    viewBox='0 0 32 32'
                    style={{display:'block', fill:'none', height:'16px', width:'16px', stroke:'currentColor', strokeWidth:4, overflow:'visible'}}
                    aria-hidden='true' role='presentation'
                    focusable='false'>
                        <path fill="none" d='M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9'>

                        </path>
                </svg>
                
            </div>

        </div>
      
    </div>
  )
}

export default SearchFilters
