'use client'
import { useState } from "react"
import { Range } from "react-date-range"
import DatePicker from "../Forms/calendar"
import UseSearchModel from "@/hooks/useSearchModel"
import Modals from "./modals"
import SelectCountry,{SelectCountryValue} from "../Forms/SelectCountry"
import CustomButton from "../Forms/CustomButton"

const SearchModel = () =>{
    const initialDateRange={
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
    }

    
    //
    const[numGuests,setNumguests]=useState('1')
    const[numBedrooms,setNumBedrooms]=useState('0')
    const[numBathrooms,setNumBathrooms]=useState('0')
    //
    const[dateRange,setDateRange]=useState(initialDateRange)
    const[country,setCountry]=useState();
    const searchModel=UseSearchModel()
    
    const closeAndSearch=()=>{
        const newSearchQuery={
            country: country?.label,
            checkIn: dateRange.startDate,
            checkOut: dateRange.endDate,
            guests: parseInt(numGuests),
            bathrooms: parseInt(numBathrooms),
            bedrooms: parseInt(numBedrooms),
            category: ''
        }
        searchModel.setQuery(newSearchQuery);
        searchModel.closeModal()
    }


    //
    // Set date range
      

        const _setDateRange=(selection)=>{
        const newStartDate = new Date(selection.startDate)
        const newEndDate = new Date(selection.endDate)
        

        if(newEndDate <= newStartDate){
            newEndDate.setDate(newStartDate.getDate() + 1)
            if(searchModel.step === 'checkin'){
            searchModel.openModal('checkout')
            }else if (searchModel.step === 'checkout'){
                searchModel.openModal('details')
                setDateRange(selection);
            }
        }

        setDateRange({
            ...dateRange,
            startDate:newStartDate,
            endDate:newEndDate
        })
    }
    //
    // Contents


    let content = (<></>)

    const contentLocation=(
        <>
            <h2 className="mb-6 text-2xl">
                Where do you want to go?
            </h2>
            <SelectCountry
                value={country}
                onChange={(value)=>setCountry(value)}
            />
            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label= "check in date ->"
                    onClick={()=> searchModel.openModal('checkin')}
                />
            </div>
        </>
    )
    const contentCheckin=(
        <>
         <h2 className="mb-6 text-2xl">
            When do you want to check in?
        </h2>
        <DatePicker
            value={dateRange}
            onChange={(value)=> _setDateRange(value.selection)}
        />
        <div className="mt-6 flex flex-row gap-4">
            <CustomButton
                label= "<- Location"
                onClick={()=> searchModel.openModal('location')}
            />
            <CustomButton
                label= "check out date ->"
                onClick={()=> searchModel.openModal('checkout')}
            />
        </div>
        </>
    )
    const contentCheckout=(
        <>
         <h2 className="mb-6 text-2xl">
            When do you want to check out?
        </h2>
        <DatePicker
            value={dateRange}
            onChange={(value)=> _setDateRange(value.selection)}
        />
        <div className="mt-6 flex flex-row gap-4">
            <CustomButton
                label= "<- Check in date"
                onClick={()=> searchModel.openModal('checkin')}
            />
            <CustomButton
                label= "details->"
                onClick={()=> searchModel.openModal('details')}
            />
        </div>
        </>
    )
    const contentDetails=(
        <>
         <h2 className="mb-6 text-2xl">
            Details
        </h2>
        <div className="space-y-4">
            <div className="space-y-4">
                <label>Number of guests:</label>
                <input 
                    type="number" 
                    min="1" 
                    value={numGuests} 
                    onChange={(e)=>setNumguests(e.target.value)}
                    className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    placeholder="Number of guests..."
                />
            </div>
            <div className="space-y-4">
                <label>Number of bedrooms:</label>
                <input 
                    type="number" 
                    min="1" 
                    value={numBedrooms} 
                    onChange={(e)=>setNumBedrooms(e.target.value)}
                    className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    placeholder="Number of bedrooms..."
                />
            </div>
            <div className="space-y-4">
                <label>Number of bathrooms:</label>
                <input 
                    type="number" 
                    min="1" 
                    value={numBathrooms} 
                    onChange={(e)=>setNumBathrooms(e.target.value)}
                    className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    placeholder="Number of bathrooms..."
                />
            </div>

        </div>
        <div className="mt-6 flex flex-row gap-4">
            <CustomButton
                label= "<- Check out date"
                onClick={()=> searchModel.openModal('checkout')}
            />
            <CustomButton
                label= "Search"
                onClick={closeAndSearch}
            />
        </div>
        </>
    )

    if(searchModel.step=="location"){
        content=contentLocation
    }else if(searchModel.step=="checkin"){
        content=contentCheckin
    }else if(searchModel.step=="checkout"){
        content=contentCheckout
    }else if(searchModel.step=="details"){
        content=contentDetails;
    }

    return(
        <Modals
            label='Search'
            content={content}
            isOpen={searchModel.isOpen}
            close={searchModel.close}
        />
    )
}
export default SearchModel