import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { chatSession } from '@/service/AIModel';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import Footer from '@/view-trip/components/Footer';

function CreateTrip() {

    const [place, setPlace] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handlePlaceChange = async (e) => {
        const query = e.target.value;
        setPlace(query);
    
        if (query.length > 2) {
            try {
                // Make a request to gomaps.pro API for autocomplete suggestions
                const response = await axios.get(
                    `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${query}&key=${import.meta.env.VITE_GOMAPS_API_KEY}`
                );
    
                // Use 'predictions' field from the response
                setSuggestions(response.data.predictions || []);
                // console.log(response.data.predictions);  // Log the response to see the structure
            } catch (error) {
                console.error('Error fetching place suggestions:', error);
            }
        } else {
            setSuggestions([]); // Clear suggestions if input is shorter than 3 characters
        }
    };

    const handleSelectPlace = (selectedPlace) => {
        // console.log(selectedPlace)
        setPlace(selectedPlace.description); // Use 'description' field from predictions
        setFormData({
            ...formData,
            location: selectedPlace, // Store the selected destination
        });
        setSuggestions([]); // Clear suggestions after selection
    };

    // handeling the form data
    const [formData, setFormData] =useState([]);

    const handleInputChange = (name, value)=>{
        setFormData({
            ...formData,
            [name]: value
        })
    }

    // Adding googl authentication
    const login = useGoogleLogin({
        onSuccess:(codeResp)=>GetUserProfile(codeResp),
        onError:(error)=>console.log(error)
    })

    // trip generation using google generative AI
    const OnGenerateTrip = async() => {
        console.log(formData)
        const user = localStorage.getItem('user');

        if(!user){
            setOpenDialog(true);
            return;
        }

        if (!formData?.location || !formData?.budget || !formData?.traveler || !formData?.noOfDays) {
            toast.error("Please fill in all required fields!", {
                position: "top-right",
            });
            return;
        }
        if (formData?.noOfDays >= 10){
            toast.error("Number of days should be less than or equal to 10!", {
                position: "top-right",
            });
            return;
        }
    
        toast.success("Trip generated successfully!", {
            position: "top-right",
        });

        console.log(formData)

        setLoading(true);
        const FINAL_PROMPT = AI_PROMPT
        .replace('{location}', formData?.location?.description)
        .replace('{noOfDays}', formData?.noOfDays)
        .replace('{budget}', formData?.budget)
        .replace('{traveler}', formData?.traveler)
        .replace('{noOfDays}', formData?.noOfDays)

        const result = await chatSession.sendMessage(FINAL_PROMPT)
        console.log(result?.response?.text());
        setLoading(false);
        SaveAITrip(result?.response?.text());
    };

    // fetching users profile
    const GetUserProfile = (tokenInfo) =>{
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,{
            headers:{
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept:'application/json'
            }
        }).then((resp)=>{
            console.log(resp);
            localStorage.setItem('user', JSON.stringify(resp.data))
            setOpenDialog(false);
            OnGenerateTrip();
        })
    }

    // saving the AI generate trip to the firebase
    const SaveAITrip = async(TripData) =>{

        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));
        const docID = Date.now().toString()
        await setDoc(doc(db, "AITrips", docID), {
            userSelection:formData,
            tripData:JSON.parse(TripData),
            userEmail:user?.email,
            id:docID
          });
        setLoading(false);
        navigate('/view-trip/'+docID)
    }

  return (
    <div className="px-4 sm:px-5 md:px-10 lg:px-32 xl:px-56 mt-10">
    <h2 className="font-bold text-2xl sm:text-3xl">
        Tell us your travel preferences 🏕️🌴
    </h2>
    <p className="mt-3 text-gray-500 text-lg sm:text-xl">
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences
    </p>

    <div className="mt-8 flex flex-col gap-8">
        {/* Destination Input */}
        <div>
            <h2 className="text-lg sm:text-xl my-2 font-medium">
                What is your destination of choice?
            </h2>
            <Input
                className="w-full text-sm sm:text-base"
                placeholder="Enter destination"
                value={place}
                onChange={handlePlaceChange}
            />
            {suggestions.length > 0 && (
                <ul className="border mt-2 bg-white shadow-md rounded-md">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className="p-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSelectPlace(suggestion)}
                        >
                            {suggestion.description}
                        </li>
                    ))}
                </ul>
            )}
        </div>

        {/* Number of Days */}
        <div>
            <h2 className="text-lg sm:text-xl my-2 font-medium">
                How many days are you planning for your trip?
            </h2>
            <Input 
                className="w-full text-sm sm:text-base"
                placeholder="Ex. 3"
                onChange={(e) => handleInputChange('noOfDays', e.target.value)}
            />
        </div>

        {/* Budget Selection */}
        <div>
            <h2 className="text-lg sm:text-xl my-2 font-medium">
                What is your budget?
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-5">
                {SelectBudgetOptions.map((item, index) => (
                    <div 
                        key={index}
                        className={`p-3 sm:p-4 border cursor-pointer rounded-lg hover:shadow-lg 
                        ${formData?.budget === item.title && 'shadow-lg border-black'}`}
                        onClick={() => handleInputChange('budget', item.title)}
                    >
                        <h2 className="text-3xl sm:text-4xl">{item.icon}</h2>
                        <h2 className="font-bold text-sm sm:text-lg">{item.title}</h2>
                        <h2 className="text-xs sm:text-sm text-gray-500">{item.desc}</h2>
                    </div>
                ))}
            </div>
        </div>

        {/* Traveler Selection */}
        <div>
            <h2 className="text-lg sm:text-xl my-2 font-medium">
                Who do you plan on traveling with on your next adventure?
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-5">
                {SelectTravelesList.map((item, index) => (
                    <div 
                        key={index}
                        className={`p-3 sm:p-4 border cursor-pointer rounded-lg hover:shadow-lg 
                        ${formData?.traveler === item.people && 'shadow-lg border-black'}`}
                        onClick={() => handleInputChange('traveler', item.people)}
                    >
                        <h2 className="text-3xl sm:text-4xl">{item.icon}</h2>
                        <h2 className="font-bold text-sm sm:text-lg">{item.title}</h2>
                        <h2 className="text-xs sm:text-sm text-gray-500">{item.desc}</h2>
                    </div>
                ))}
            </div>
        </div>

        {/* Generate Trip Button */}
        <div className="my-5 flex justify-center sm:justify-end">
            <Button 
                className="w-full sm:w-auto px-5 py-2 sm:px-6 sm:py-3"
                onClick={OnGenerateTrip} 
                disabled={loading}
            >
                {loading ? (
                    <AiOutlineLoading3Quarters className="h-6 w-6 sm:h-7 sm:w-7 animate-spin"/>
                ) : (
                    "Generate Trip"
                )}
            </Button>
        </div>

        {/* Sign In Dialog */}
        <Dialog open={openDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogDescription>
                        <img src='./logo.png' className='h-[120px] sm:h-[150px] object-contain'/>
                        <h2 className='font-bold text-lg px-4 sm:px-7'>Sign In With Google</h2>
                        <p className='px-4 sm:px-7'>Sign in to the app with Google authentication securely</p>

                        <Button 
                            className='w-full mt-4 sm:mt-5 flex gap-3 sm:gap-4 items-center'
                            onClick={login}
                        >
                            <FcGoogle className='h-8 w-8 sm:h-10 sm:w-10'/> Sign In With Google
                        </Button>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

        <ToastContainer />
    </div>

    <Footer />
</div>

  )
}

export default CreateTrip