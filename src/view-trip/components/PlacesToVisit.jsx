import React, { useEffect, useState } from 'react';
import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      <h2 className='font-bold text-xl'>Places to Visit</h2>

      {trip?.tripData?.itinerary?.map((item, placeIndex) => (
        <div key={placeIndex}>
          <h2 className='font-medium my-2 text-md'>Day {item?.day} ({item?.theme})</h2>
          <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-2'>
            {item.plan.map((place, index) => (
              <div key={index}>
                <h2 className='font-medium text-sm text-orange-500'>Best Time to Visit : {place?.best_time_to_visit} ({place?.time})</h2>
                <PlaceCardItem  
                  place={place}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlacesToVisit;
