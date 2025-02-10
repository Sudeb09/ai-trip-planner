import { Button } from '@/components/ui/button'
// import { GetPlaceDetails } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";
import { db } from '@/service/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

function InfoSection({trip}) {

  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    if (trip?.userSelection?.location?.description) {
      fetchPhotoFromFirebase(trip?.userSelection?.location?.description, trip?.id);
    }
  }, [trip]);

  // Step 1: Fetch Photo from Firebase Firestore
  const fetchPhotoFromFirebase = async (placeName, tripId) => {
    const placeRef = doc(db, 'AITrips', tripId);
    const placeSnap = await getDoc(placeRef);
    // console.log(placeSnap)
    // console.log(placeSnap.data())
    if (placeSnap.exists()) {
      const data = placeSnap.data();
      // console.log(data)
      if (data.tripPhotoURL) {
        // console.log(data.tripPhotoURL)
        setPhotoUrl(data.tripPhotoURL);
        return;
      }
    }

    // If no photo exists, fetch from Google Maps and update Firebase
    GetPlacePhoto(placeName, tripId);
  };

  const GetPlacePhoto = async (placeName, tripId) => {
    // Step 1: Get Place ID from Place Name
    const autoResponse = await fetch(
      `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(placeName)}&key=${import.meta.env.VITE_GOMAPS_PLACE_API_KEY}`
    );
    const autoData = await autoResponse.json();

    const placeId = autoData?.predictions?.[0]?.place_id;
    if (!placeId) return;

    // Step 2: Get Photo Reference from Place Details
    const detailsResponse = await fetch(
      `https://maps.gomaps.pro/maps/api/place/details/json?place_id=${placeId}&key=${import.meta.env.VITE_GOMAPS_API_KEY}`
    );
    const detailsData = await detailsResponse.json();
    // console.log(detailsData?.result?.photos)

    const photoReference = detailsData?.result?.photos?.[6]?.photo_reference;
    // // console.log(`Photo reference: ${photoReference}`)
    if (!photoReference) return;

    // Step 3: Generate Photo URL
    const photoUrl = `https://maps.gomaps.pro/maps/api/place/photo?maxwidth=1000&maxheight=1000&photoreference=${photoReference}&key=${import.meta.env.VITE_GOMAPS_API_KEY}`;
    await updateDoc(doc(db, 'AITrips', tripId), { tripPhotoURL: photoUrl });
    setPhotoUrl(photoUrl);
    // console.log(photoUrl);
  };

  return (
    <div className='p-5 sm:p-10 md:px-20 lg:px-44 xl:px-56'>
      {/* Trip Image */}
      <img 
          src={photoUrl ? photoUrl : "/placeholder.jpg"} 
          alt="Trip Image" 
          className='h-[200px] sm:h-[280px] md:h-[340px] w-full object-cover rounded-xl'
      />

      {/* Trip Details */}
      <div className='my-5 flex flex-col gap-3'>
          <h2 className='text-lg sm:text-xl md:text-2xl font-bold'>
              {trip?.userSelection?.location?.description}
          </h2>

          {/* Trip Info Badges */}
          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3'>
              <div className='flex flex-wrap gap-2 sm:gap-5'>
                  <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs sm:text-sm'>
                      📅 Duration: {trip?.userSelection?.noOfDays} Days
                  </h2>
                  <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs sm:text-sm'>
                      💰 Budget: {trip?.userSelection?.budget}
                  </h2>
                  <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs sm:text-sm'>
                      🥂 No. of Travelers: {trip?.userSelection?.traveler}
                  </h2>
              </div>

              {/* Send Button */}
              <Button className="p-2 sm:p-3">
                  <IoIosSend className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
          </div>
      </div>
  </div>

  )
}

export default InfoSection