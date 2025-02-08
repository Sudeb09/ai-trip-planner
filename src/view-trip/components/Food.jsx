import React from 'react'
import FoodCardItem from './FoodCardItem'

function Food({trip}) {
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
        <h2 className='font-bold text-xl mt-5'>Food Places Recommendation</h2>
        
        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
            {trip?.tripData?.food_places?.map((food,index)=>(
                <FoodCardItem index={index} food={food} tripId={trip?.id}/>
            ))}
        </div>
    </div>
  )
}

export default Food