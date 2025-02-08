import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';
import Food from '../components/Food';

function Viewtrip() {

    const {tripId} = useParams();
    const [trip, setTrip] = useState([]);

    useEffect(()=>{
        tripId&&GetTripData();
    },[tripId])

    // fetching trip data from firebase
    const GetTripData = async()=>{
        const docRef = doc(db, 'AITrips',tripId)
        const docSnap = await getDoc(docRef)

        if(docSnap.exists()){
            console.log("Document:", docSnap.data());
            setTrip(docSnap.data());
        }
        else{
            console.log("No such document!");
            toast.error("Please fill in all required fields!", {
                position: "top-right",
            });
        }
    }
  return (
    <div>
        {/* Information sections */}
        <InfoSection trip={trip} />
        {/* Recommended hotels */}
        <Hotels trip={trip} />
        {/* Food place Recommendation */}
        <Food trip={trip} />
        {/* Daily Plans */}
        <PlacesToVisit trip={trip}/>
        {/* Footer */}
        <Footer trip={trip} />

        <ToastContainer />
    </div>
    
  )
}

export default Viewtrip