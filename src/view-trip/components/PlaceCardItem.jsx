import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { db } from '@/service/firebaseConfig';
import { doc, getDoc, Transaction, updateDoc } from 'firebase/firestore';

function PlaceCardItem({place, tripId, index, placeIdx}) {

  const [photoUrl, setPhotoUrl] = useState(null);

    useEffect(() => {
      if (place?.placeName) {
        fetchPhotoFromFirebase(place?.placeName, tripId, placeIdx, index);
      }
    }, [place]);
  
    // Step 1: Fetch Photo from Firebase Firestore
    const fetchPhotoFromFirebase = async (placeName, tripId, placeIdx, index) => {
      const placeRef = doc(db, 'AITrips', tripId);
      const placeSnap = await getDoc(placeRef);
      // console.log(placeSnap)
      // console.log(placeSnap.data())
      if (placeSnap.exists()) {
        const data = placeSnap.data();
        // console.log(data)
        // console.log(data?.tripData?.itinerary?.[placeIdx]?.plan?.[index]?.imageURL)
        if (data?.tripData?.itinerary?.[placeIdx]?.plan?.[index]?.imageURL) {
          setPhotoUrl(data?.tripData?.itinerary?.[placeIdx]?.plan?.[index]?.imageURL);
          return;
        }
      }
  
      // If no photo exists, fetch from Google Maps and update Firebase
      GetPlacePhoto(placeName, placeIdx, placeRef, index);
    };
  
    const GetPlacePhoto = async (placeName, placeIdx, placeRef, planIdx) => {
      // Step 1: Get Place ID from Place Name
      const autoResponse = await fetch(
        `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(placeName)}&key=${import.meta.env.VITE_GOMAPS_PLACE_API_KEY}`
      );
      const autoData = await autoResponse.json();
  
      const placeId = autoData?.predictions?.[0]?.place_id;
      // if (!placeId) return;
  
      // Step 2: Get Photo Reference from Place Details
      const detailsResponse = await fetch(
        `https://maps.gomaps.pro/maps/api/place/details/json?place_id=${placeId}&key=${import.meta.env.VITE_GOMAPS_API_KEY}`
      );
      const detailsData = await detailsResponse.json();
      // console.log(detailsData)
  
      const photoReference = detailsData?.result?.photos?.[8]?.photo_reference;
      // // console.log(`Photo reference: ${photoReference}`)
  
      // Step 3: Generate Photo URL
      const photoUrl = photoReference
      ? `https://maps.gomaps.pro/maps/api/place/photo?maxwidth=1000&maxheight=1000&photoreference=${photoReference}&key=${import.meta.env.VITE_GOMAPS_API_KEY}`
      : "/placeholder.jpg";
      setPhotoUrl(photoUrl);
  
      // Step 4: Update Firebase with the new hotelImageUrl
      await updateHotelImageInFirebase(placeRef, placeIdx, planIdx, photoUrl); // placeName, placeIdx, placeRef, planIdx
    };

      // Update Hotel Image URL in Firebase Firestore
      const updateHotelImageInFirebase = async (placeRef, placeIdx, planIdx, imageUrl) => {
        const placeSnap = await getDoc(placeRef);
        if (!placeSnap.exists()) return;
    
        const data = placeSnap.data();
        const itinerary = data?.tripData?.itinerary || [];
      
        // Ensure the given placeIdx is valid
        if (!itinerary[placeIdx]) {
          console.log('Invalid placeIdx, itinerary entry does not exist.', {placeIdx});
          return;
        }
        // Ensure plan exists before modifying
        const planArray = [...(itinerary[placeIdx].plan || [])];

        // Update the specific plan with the new imageURL
        if (planArray[planIdx]) {
          planArray[planIdx] = {
            ...planArray[planIdx], // Keep existing data
            imageURL: imageUrl, // Update only imageURL
          };
        }
        // Keep day and theme intact
        const updatedDay = itinerary[placeIdx].day;
        const updatedTheme = itinerary[placeIdx].theme;

        // Update only the specific itinerary entry without losing other plans
        await updateDoc(placeRef, {
          [`tripData.itinerary.${placeIdx}.plan`]: planArray, // Update full plan array for the day
          [`tripData.itinerary.${placeIdx}.day`]: updatedDay, // Ensure day remains unchanged
          [`tripData.itinerary.${placeIdx}.theme`]: updatedTheme, // Ensure theme remains unchanged
        });

        console.log('Updated Firestore successfully with image URL:', imageUrl);


      // Check if the placeIdx and planIdx exist
      // if (itinerary[placeIdx]?.plan?.[planIdx]) {
      //   // Get the specific plan
      //   const updatedPlan = { ...itinerary[placeIdx].plan[planIdx] }; // Make a shallow copy
      //   updatedPlan.imageURL = imageUrl; // Update the imageURL field

      //   // Ensure day and theme remain intact
      //   const day = itinerary[placeIdx].day;
      //   const theme = itinerary[placeIdx].theme;

      //   // Rebuild the plan array with the updated plan (day and theme included)
      //   const updatedPlanArray = [...itinerary[placeIdx].plan];
      //   updatedPlanArray[planIdx] = updatedPlan; // Replace the specific plan

      //   // Rebuild the itinerary array with the updated plan
      //   const updatedItinerary = [...itinerary];
      //   updatedItinerary[placeIdx] = {
      //     ...updatedItinerary[placeIdx],
      //     day, // Keep the day intact
      //     theme, // Keep the theme intact
      //     plan: updatedPlanArray, // Update the plan with the modified plan array
      //   };

      //   // Update the entire itinerary in Firestore
      //   await updateDoc(placeRef, {
      //     [`tripData.itinerary`]: updatedItinerary,
      //   });

      //     // console.log('Image URL updated in Firestore:', imageUrl);
      //   } else {
      //     // console.log('Place or Plan not found.');
      //   }
      }


  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+place?.placeName} target='_blank'>
        <div className='border rounded-xl p-3 my-2 flex gap-5 hover:scale-105 transition-all hover:shadow-sm cursor-pointer'>
            <img src={photoUrl? photoUrl : "/placeholder.jpg"} alt="" className='w-[130px] h-[130px] rounded-xl' />
            <div>
                <h2 className='font-bold text-lg text-neutral-700'>{place?.placeName} ({place?.placeActivity})</h2>
                <p className='text-xs text-gray-400'>{place?.description}</p>
                <h2 className='text-xs mt-2 text-neutral-700'>🕙 {place?.travelTime}</h2>
                <h2 className='text-xs mt-2 text-neutral-700'>🎫 {place?.tricketPricing}</h2>
            </div>
        </div>
    </Link>
  )
}

export default PlaceCardItem