import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '@/service/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

function FoodCardItem({food, tripId, index}) {
  const [photoUrl, setPhotoUrl] = useState(null);
  
    useEffect(() => {
      if (food?.name) {
        fetchPhotoFromFirebase(food?.name, tripId);
      }
    }, [food]);
  
    // Step 1: Fetch Photo from Firebase Firestore
    const fetchPhotoFromFirebase = async (foodName, tripId) => {
      const placeRef = doc(db, 'AITrips', tripId);
      const placeSnap = await getDoc(placeRef);
      // console.log(placeSnap)
      // console.log(placeSnap.data())
      if (placeSnap.exists()) {
        const data = placeSnap.data();
        // console.log(data)
        // console.log(data?.tripData?.hotel_options?.[index]?.hotelImageURL)
        if (data?.tripData?.food_places?.[index]?.imageUrl) {
          setPhotoUrl(data?.tripData?.food_places?.[index]?.imageUrl);
          return;
        }
      }
  
      // If no photo exists, fetch from Google Maps and update Firebase
      GetPlacePhoto(foodName, index, placeRef);
    };
  
    const GetPlacePhoto = async (foodName, foodIndex, placeRef) => {
      // Step 1: Get Place ID from Place Name
      const autoResponse = await fetch(
        `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(foodName)}&key=${import.meta.env.VITE_GOMAPS_PLACE_API_KEY}`
      );
      const autoData = await autoResponse.json();
  
      const placeId = autoData?.predictions?.[0]?.place_id;
    //   if (!placeId) return;
  
      // Step 2: Get Photo Reference from Place Details
      const detailsResponse = await fetch(
        `https://maps.gomaps.pro/maps/api/place/details/json?place_id=${placeId}&key=${import.meta.env.VITE_GOMAPS_API_KEY}`
      );
      const detailsData = await detailsResponse.json();
      // console.log(detailsData)
  
      const photoReference = detailsData?.result?.photos?.[8]?.photo_reference;
      // // console.log(`Photo reference: ${photoReference}`)
    //   if (!photoReference) return;
  
      // Step 3: Generate Photo URL
      const photoUrl = photoReference
      ? `https://maps.gomaps.pro/maps/api/place/photo?maxwidth=1000&maxheight=1000&photoreference=${photoReference}&key=${import.meta.env.VITE_GOMAPS_API_KEY}`
      : "/placeholder.jpg";
      setPhotoUrl(photoUrl);
  
      // Step 4: Update Firebase with the new hotelImageUrl
      await updateHotelImageInFirebase(placeRef, foodIndex, photoUrl);
    };
  
    // Update Hotel Image URL in Firebase Firestore
    const updateHotelImageInFirebase = async (placeRef, foodIndex, imageUrl) => {
      const placeSnap = await getDoc(placeRef);
      if (!placeSnap.exists()) return;
  
      const data = placeSnap.data();
      const foodPlaces = data?.tripData?.food_places || [];
  
      if (foodPlaces[foodIndex]) {
        foodPlaces[foodIndex].imageUrl = imageUrl;
      }
  
      await updateDoc(placeRef, {
        'tripData.food_places': foodPlaces
      });
  
      // console.log('Hotel image URL updated in Firebase:', imageUrl);
    };

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+food?.name+','+food?.address} target='_blank'>
        <div className='mt-5 hover:scale-105 transition-all cursor-pointer'>
            <img src={photoUrl? photoUrl : "/placeholder.jpg"} alt="" className='h-[180px] w-full object-cover rounded-xl'/>
            <div className='my-2 flex flex-col gap-2'>
                <h2 className='font-bold text-neutral-700'>{food?.name}</h2>
                <h2 className='text-xs text-neutral-700'>{food?.description}</h2>
                <h2 className='text-xs text-gray-500'>📌 {food?.address}</h2>
                <h2 className='text-sm text-neutral-700'>⭐ {food?.rating}</h2>
            </div>
        </div>
    </Link>
  )
}

export default FoodCardItem