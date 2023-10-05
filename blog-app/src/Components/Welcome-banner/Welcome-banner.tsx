"use client";
import './welcome-banner.scss'
import Image from "next/image";
import Typewriter from 'typewriter-effect';
import { welcome_qoute } from '@/Utils/Constants';
import { useUser } from '@clerk/nextjs';
import { useEffect,useState} from 'react';

export default function Welcome() {
   const { isLoaded, isSignedIn, user } = useUser();
   const [username,setUsername]=useState("");

// useEffect(()=>{
//       const res=await fetch(`/api/user/${user?.id}`,{
//           method:"GET",
//          });

//         const{username}=await res.json();
//         if(username)
//         {
//           setUsername(username);
//         }
//    },[user]);


  return(
  <div className='welcome-wrapper'>
  <div className='welcome-gradient'/>
  <p className='user-welcome'>Welcome {user?.firstName || "Blogger"} </p>

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
