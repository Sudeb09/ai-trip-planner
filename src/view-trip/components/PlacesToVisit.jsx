import React, { useEffect, useState } from 'react';
import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  const [tripData, setTripData] = useState(null);

  useEffect(() => {
    fetchTripData();
  }, [trip]);

  const fetchTripData = async () => {
    const tripRef = doc(db, 'AITrips', trip?.id);
    const tripSnap = await getDoc(tripRef);

    if (tripSnap.exists()) {
      const data = tripSnap.data();
      const itineraryMap = data?.tripData?.itinerary || {};
      const itineraryArray = Object.keys(itineraryMap).map((key) => ({
        day: itineraryMap[key]?.day,
        theme: itineraryMap[key]?.theme,
        plan: itineraryMap[key]?.plan || [],
      }));

      setTripData({ ...data.tripData, itinerary: itineraryArray });
    }
  };

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      <h2 className='font-bold text-xl'>Places to Visit</h2>

      {tripData?.itinerary?.map((item, placeIndex) => (
        <div key={placeIndex}>
          <h2 className='font-medium my-2 text-md'>Day {item.day} ({item.theme})</h2>
          <div className='grid grid-cols-2 gap-2'>
            {item.plan.map((place, index) => (
              <div key={index}>
                <h2 className='font-medium text-sm text-orange-500'>{place.best_time_to_visit} {place.time}</h2>
                <PlaceCardItem 
                  index={index} 
                  place={place} 
                  tripId={trip?.id} 
                  placeIdx={placeIndex} 
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
