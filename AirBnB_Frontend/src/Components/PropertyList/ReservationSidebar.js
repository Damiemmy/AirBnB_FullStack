"use client";
import { useState,useEffect } from 'react';
import { Range } from 'react-date-range';
import apiService from '@/services/ApiService';
import UserLoginModal from '@/hooks/UseLoginModal';
import { getUserId } from '@/app/lib/action';
import DatePicker from '../Forms/calendar';
import {differenceInDays,eachDayOfInterval} from 'date-fns';
import { format } from 'date-fns';
import { api } from '@/services/ApiServices';

const ReservationSidebar = ({property,userId}) => {
    const initialDateRange={
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
    }
    const [fee, setFee]= useState(0)
    const [nights, setNights]= useState(1)
    const [totalprice, setTotalPrice]= useState(0)
    const [dateRange, setDataRange]= useState(initialDateRange);
    const [minDate,setMinDate]= useState(new Date());
    const [guest,setGuest]= useState('1');
    const [bookedDates,setBookedDates]=useState([]);
    const guestRange= Array.from({length: property.guest},(_, index)=> index + 1)
    const userLogin=UserLoginModal()


    const perform_booking=async()=>{
        if(userId){
            if(dateRange.startDate && dateRange.endDate){
                const formData= new FormData()
                formData.append('guests',guest)
                formData.append('start_date',format(dateRange.startDate,'yyyy-MM-dd'))
                formData.append('end_date',format(dateRange.endDate,'yyyy-MM-dd'))
                formData.append('number_of_nights',nights)
                formData.append('total_price',totalprice)

                const response=await apiService.post(`/api/properties/${property.id}/book/`,formData)
                if (response.success){
                    console.log({"successful":"reservation Booked Successfully"})
                }else{
                    console.log('something went Wrong...')
                }
                
                

            }
            
        }
        else{
            userLogin.openModal()
        }
    }

    const _setDateRange=(selection)=>{
        const newStartDate = new Date(selection.startDate)
        const newEndDate = new Date(selection.endDate)

        if(newEndDate <= newStartDate){
            newEndDate.setDate(newStartDate.getDate() + 1)
        }

        setDataRange({
            ...dateRange,
            startDate:newStartDate,
            endDate:newEndDate
        })

        console.log({'startDate':dateRange.startDate,'endDate':dateRange.endDate})
    }

    const getReservations=async()=>{
        const Reservation = await apiService.get(`/api/properties/${property.id}/reservations/`)
        let dates = [];


        Reservation.forEach((reservation)=>{
            const range = eachDayOfInterval({
                start: new Date(reservation.start_date),
                end: new Date(reservation.end_date)
            });

            dates=[...dates,...range]
        })

        setBookedDates(dates);

    }

    useEffect(()=>{
        getReservations()
        if(dateRange.startDate && dateRange.endDate){
            //Debugging if startDate and endDate is Recieved correctly:
            
            console.log(dateRange.startDate)
            console.log(dateRange.endDate)

            //
            const dayCount= differenceInDays(
                dateRange.endDate,
                dateRange.startDate
                
            );
            if(dayCount && property.price_per_night){
                const _fee=((dayCount * property.price_per_night) / 100) * 5;
                setFee(_fee);
                setTotalPrice(dayCount * property.price_per_night + _fee);
                setNights(dayCount)

            }else{
                const _fee=(property.price_per_night/100)*5;
                setFee(_fee)
                setTotalPrice(property.price_per_night + _fee)
                setNights(1)
            }

        }
    },[dateRange])
  return (
    <aside className='p-6 rounded-xl col-span-2 border mt-6 border-gray-300 shadow-xl'>
        <h1 className='mb-5 text-2xl'>${property.price_per_night} per night</h1>
        <DatePicker
            value={dateRange}
            onChange={(value)=> _setDateRange(value.selection)}
            bookedDates={bookedDates}
        />
        <div className='mb-6 border border-gray-400 p-3 rounded-xl'>
            <label className='block pb-2 font-bold text-xs opacity-80'>Guests</label>
            <select 
                className='w-full -ml-1 text-xm'
                value={guest}
                onChange={(e)=>setGuest(e.target.value)}
            >
                {guestRange.map(number=>(
                    <option key={number} value={number}>{number}</option>
                ))}
            </select>
        </div>
        <div
            onClick={perform_booking}
            className='w-full py-6 mb-6 cursor-pointer text-center text-white bg-[#ff385c] hover:bg-[#d50027] rounded-xl'>Book
        </div>
        <div className='mb-4 flex justify-between opacity-90 align-center'>
            <p>${property.price_per_night} * {nights} nights</p>
            <p>${property.price_per_night * nights}</p>

        </div>
        <div className='mb-4 flex justify-between opacity-90 align-center'>
            <p>DjangoAirbnb Fee</p>
            <p>${fee}</p>

        </div>
        <hr className='text-gray-300'/>
        <div className='mt-4 flex justify-between opacity-90 align-center font-bold'>
            <p>Total</p>
            <p>${totalprice}</p>

        </div>
    </aside>
  )
}

export default ReservationSidebar
