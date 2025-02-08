import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import axios from 'axios'


function Header() {

  const user = JSON.parse(localStorage.getItem('user'))
  const [openDialog, setOpenDialog] = useState(false);

  // Adding googl authentication
  const login = useGoogleLogin({
    onSuccess:(codeResp)=>GetUserProfile(codeResp),
    onError:(error)=>console.log(error)
})

  // fetching users profile
  const GetUserProfile = (tokenInfo) =>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,{
        headers:{
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept:'application/json'
        }
    }).then((resp)=>{
        // console.log(resp);
        localStorage.setItem('user', JSON.stringify(resp.data))
        setOpenDialog(false);
      window.location.reload();
    })
  }

  useEffect(()=>{
    // console.log(user)
  },[])

  return (
    <div className='p-3 shadow-md flex justify-between items-center px-10 h-[80px]'>
        <a href="/"><img src="/logo.png" alt="" className='h-[160px] object-contain'/></a>
        <div>
        {user
        ? <div className='flex items-center gap-3'>
            <a href="/my-trips"><Button variant="outline" className="rounded-full text-black">My Trips</Button></a>
            <a href="/create-trip"><Button variant="outline" className="rounded-full text-black">+ Create Trip</Button></a>
            <Popover>          
              <PopoverTrigger><img src={user?.picture} alt="" className='h-[35px] w-[35px] rounded-full'/></PopoverTrigger>
              <PopoverContent>
                <h2 className="cursor-pointer" onClick={()=>{
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>Log Out</h2>
              </PopoverContent>
            </Popover>

          </div>
        : <Button onClick={()=>setOpenDialog(true)}>Sign In</Button>
        }
        </div>
        <Dialog open={openDialog}>
            <DialogContent>
                <DialogHeader>
                <DialogDescription>
                    <img src='./logo.png' className='h-[150px] object-contain'/>
                    <h2 className='font-bold text-lg px-7'>Sign In With Google</h2>
                    <p className='px-7'>Sign in to the app with google authentication securely</p>

                    <Button 
                        className='w-full mt-5 flex gap-4 items-center'
                        onClick={login}
                    ><FcGoogle className='h-10 w-10'/> Sign In With Google
                    </Button>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default Header