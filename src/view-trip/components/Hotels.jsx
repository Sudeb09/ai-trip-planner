import React from 'react'
import { Link } from 'react-router-dom'
import HotelCardItem from './HotelCardItem'

function Hotels({trip}) {
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
        <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>
        
        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
            {trip?.tripData?.hotel_options?.map((hotel,index)=>(
                <HotelCardItem index={index} hotel={hotel} tripId={trip?.id}/>
            ))}
        </div>
    </div>
  )
}

export default Hotels