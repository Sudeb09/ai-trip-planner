import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { db } from '@/service/firebaseConfig';
import { doc, getDoc, Transaction, updateDoc } from 'firebase/firestore';

function PlaceCardItem({place}) {

  const [photoUrl, setPhotoUrl] = useState(null);

    useEffect(() => {
      if (place?.placeName) {
        // fetchPhotoFromFirebase(place?.placeName);
      }
    }, [place]);
  
    // Step 1: Fetch Photo from Firebase Firestore
    const fetchPhotoFromFirebase = async (placeName) => {
  
      // If no photo exists, fetch from Google Maps and update Firebase
      GetPlacePhoto(placeName);
    };
  
    const GetPlacePhoto = async (placeName) => {
      // Step 1: Get Place ID from Place Name
      const autoResponse = await fetch(
        `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(placeName)}&key=${import.meta.env.VITE_GOMAPS_PLACE_API_KEY}`
      );
      const autoData = await autoResponse.json();
  
      const placeId = autoData?.predictions?.[2]?.place_id;
      // if (!placeId) return;
  
      // Step 2: Get Photo Reference from Place Details
      const detailsResponse = await fetch(
        `https://maps.gomaps.pro/maps/api/place/details/json?place_id=${placeId}&key=${import.meta.env.VITE_GOMAPS_PLACE_API_KEY}`
      );
      const detailsData = await detailsResponse.json();
      // console.log(detailsData)
  
      const photoReference = detailsData?.result?.photos?.[2]?.photo_reference;
      // // console.log(`Photo reference: ${photoReference}`)
  
      // Step 3: Generate Photo URL
      const photoUrl = photoReference
      ? `https://maps.gomaps.pro/maps/api/place/photo?maxwidth=1000&maxheight=1000&photoreference=${photoReference}&key=${import.meta.env.VITE_GOMAPS_PLACE_API_KEY}`
      : "/placeholder.jpg";
      setPhotoUrl(photoUrl);
    };



  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+place?.placeName} target='_blank'>
    <div className='border rounded-xl p-3 my-4 hover:scale-105 transition-all hover:shadow-sm cursor-pointer min-h-[300px]'>
        <div className='w-full'>
            <img src={photoUrl ? photoUrl : "/placeholder.jpg"} alt="" className='w-full h-[180px] object-cover rounded-xl' />
        </div>
        <div className='flex flex-col gap-2 mt-2 sm:mt-0'>
            <h2 className='font-bold text-base sm:text-lg text-neutral-700'>{place?.placeName} ({place?.placeActivity})</h2>
            <p className='text-xs sm:text-sm text-gray-400'>{place?.description}</p>
            <h2 className='text-xs sm:text-sm text-neutral-700'>🕙 {place?.travelTime_from_the_previous_location}</h2>
            <h2 className='text-xs sm:text-sm text-neutral-700'>🎫 {place?.tricketPricing}</h2>
        </div>
    </div>
</Link>




  )
}

export default PlaceCardItem