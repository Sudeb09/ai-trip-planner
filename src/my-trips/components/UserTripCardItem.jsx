import React from 'react'
import { Link } from 'react-router-dom'

function UserTripCardItem({trip}) {
  return (
    <Link to={'/view-trip/' + trip?.id} className="block">
      <div className='hover:scale-105 active:scale-100 transition-all p-2 sm:p-3 rounded-xl shadow-sm bg-white'>
          {/* Trip Image */}
          <img 
              src={trip?.tripPhotoURL} 
              alt="" 
              className='object-cover rounded-xl w-full h-[150px] sm:h-[180px] md:h-[200px]'
          />
          
          {/* Trip Info */}
          <div className="mt-2">
              <h2 className='font-bold text-sm sm:text-md text-black'>
                  {trip?.userSelection?.location?.description}
              </h2>
              <h2 className='text-xs sm:text-sm text-gray-500'>
                  {trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} budget
              </h2>
          </div>
      </div>
  </Link>

  )
}

export default UserTripCardItem