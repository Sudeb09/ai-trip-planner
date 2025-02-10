import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import { FiMenu } from "react-icons/fi"; // Hamburger icon
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import axios from 'axios'

function Header() {
  const user = JSON.parse(localStorage.getItem('user'))
  const [openDialog, setOpenDialog] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  })

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'application/json'
      }
    }).then((resp) => {
      localStorage.setItem('user', JSON.stringify(resp.data))
      setOpenDialog(false);
      window.location.reload();
    })
  }

  return (
    <div className='p-3 shadow-md flex justify-between items-center px-4 md:px-10 h-[70px] w-full'>
      
      {/* Website Logo */}
      <a href="/">
        <img 
          src="/logo.png" 
          alt="Logo" 
          className="h-[50px] max-w-[120px] md:h-[80px] object-contain flex-shrink-0" 
        />
      </a>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-3">
        {user ? (
          <>
            <a href="/my-trips">
              <Button variant="outline" className="rounded-full text-black text-sm md:text-base">My Trips</Button>
            </a>
            <a href="/create-trip">
              <Button variant="outline" className="rounded-full text-black text-sm md:text-base">+ Create Trip</Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img src={user?.picture} alt="User" className='h-[35px] w-[35px] rounded-full' />
              </PopoverTrigger>
              <PopoverContent>
                <h2 className="cursor-pointer" onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>
                  Log Out
                </h2>
              </PopoverContent>
            </Popover>
          </>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <FiMenu className="text-2xl" />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-[70px] left-0 w-full bg-white shadow-md flex flex-col items-center p-5 md:hidden">
          {user ? (
            <>
              <a href="/my-trips" className="w-full text-center py-2 text-black">My Trips</a>
              <a href="/create-trip" className="w-full text-center py-2 text-black">+ Create Trip</a>
              <Popover>
                <PopoverTrigger>
                  <img src={user?.picture} alt="User" className='h-[40px] w-[40px] rounded-full mx-auto' />
                </PopoverTrigger>
                <PopoverContent className="text-center">
                  <h2 className="cursor-pointer" onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}>
                    Log Out
                  </h2>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
          )}
        </div>
      )}

      {/* Sign-In Dialog */}
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src='/logo.png' className='h-[100px] md:h-[150px] object-contain' />
              <h2 className='font-bold text-lg px-4 md:px-7'>Sign In With Google</h2>
              <p className='px-4 md:px-7'>Sign in to the app with Google authentication securely</p>
              <Button 
                className='w-full mt-5 flex gap-4 items-center text-sm md:text-base'
                onClick={login}
              >
                <FcGoogle className='h-8 w-8 md:h-10 md:w-10' /> Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
