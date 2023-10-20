"use client";
import './welcome-banner.scss'
import Image from "next/image";
import Typewriter from 'typewriter-effect';
import { welcome_qoute } from '@/Utils/Constants';
import { useUser } from '@clerk/nextjs';
import { useEffect,useState} from 'react';
import { getUserDetailsAction } from '@/actions/user.actions';
export default function Welcome() {
   const { isLoaded, isSignedIn, user } = useUser();
   const [username,setUsername]=useState("");

  const fetchUserName=async()=>{
  const{data}=await getUserDetailsAction(user?.id);
  setUsername(data.username);
  }

   useEffect(()=>{
    fetchUserName();
   },[user]);
  

  return(
  <div className='welcome-wrapper'>
  <div className='welcome-gradient'/>
  <p className='user-welcome'>Welcome {username || "Blogger"} </p>

<Typewriter
  options={{
    strings: welcome_qoute,
    autoStart: true,
    loop: true,
    delay:150,
  }}
/>

  </div>)

}
