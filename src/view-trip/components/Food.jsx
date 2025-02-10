import React from 'react'
import FoodCardItem from './FoodCardItem'

function Food({trip}) {
  return (
    <div className='p-5 sm:p-10 md:px-20 lg:px-44 xl:px-56'>
      <h2 className='font-bold text-xl mt-5'>Food Places Recommendation</h2>
      
      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5'>
          {trip?.tripData?.food_places?.map((food, index) => (
              <FoodCardItem key={index} index={index} food={food} tripId={trip?.id}/>
          ))}
      </div>
  </div>
  )
}

export default Food