
import './welcome-banner.scss'
import Image from "next/image";
import Typewriter from 'typewriter-effect';
import { welcome_qoute } from '@/Utils/Constants';
import { currentUser } from '@clerk/nextjs';

export default async function Welcome() {
    const user=await currentUser();
    console.log(user);
  return(
  <div className='welcome-wrapper'>
  <div className='welcome-gradient'/>
  <p className='user-welcome'>Welcome {user?.firstName || "Blogger"} </p>
  <p className='typewriter'> Create.inspire.Repeat</p>

  </div>)

}
