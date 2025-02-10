import { db } from '@/service/firebaseConfig';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate, useNavigation } from 'react-router-dom';
import UserTripCardItem from './components/UserTripCardItem';
import Footer from '@/view-trip/components/Footer';

function MyTrips() {

    const navigation = useNavigation();
    const [userTrips, setUserTrips] = useState([]);

    useEffect(()=>{
        GetUserTrips();
    },[])

    const GetUserTrips=async()=>{
        const user = JSON.parse(localStorage.getItem('user'))

        if(!user){
            navigation('/');
            return;
        }
        // setUserTrips([]);
        const q = query(collection(db, 'AITrips'), where('userEmail', '==', user?.email));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot)
        const trips = querySnapshot.docs.map(doc => doc.data());
        console.log(trips)
        setUserTrips(trips);
    }

  return (
    <div className='px-4 sm:px-10 md:px-32 lg:px-56 xl:px-72 mt-10 flex flex-col min-h-[85vh]'>
        <h2 className='font-bold text-2xl sm:text-3xl'>My Trips</h2>

        {/* Trip Cards Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-6 gap-4'>
            {userTrips?.length > 0 ? (
                userTrips.map((trip, index) => (
                    <UserTripCardItem trip={trip} key={index} />
                ))
            ) : (
                [1, 2, 3, 4, 5, 6].map((item, index) => (
                    <div key={index} className='h-[200px] sm:h-[250px] w-full bg-slate-200 animate-pulse rounded-xl'></div>
                ))
            )}
        </div>

        {/* Footer at the Bottom */}
        <div className='mt-10 sm:mt-auto'>
            <Footer />
        </div>
    </div>

  )
}

export default MyTrips