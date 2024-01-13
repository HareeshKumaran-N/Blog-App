"use client";
import "./Profile-Button.scss";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useEffect,useState } from "react";
import { default_user_profile } from "@/Utils/Constants";
import { getUserDetailsAction } from "@/actions/user.actions";

const ProfileButton = () => {
 
  const[userDetails,setUserDetails]=useState({});

  const { isSignedIn, user, isLoaded } = useUser();

  const fetchUserData=async ()=>{
    const res=await getUserDetailsAction(user?.id);
    setUserDetails(res?.data)
  }
  useEffect(()=>{
    if(isSignedIn && isLoaded)
    {
      fetchUserData();
    }
  },[user])

  return (

      <Link href="/MyProfile">
        <Image
          className="profile-image"
          src={
            userDetails?.profile_pic
              ? userDetails?.profile_pic
              : default_user_profile
          }
          width={25}
          height={25}
          alt="Profile_pic"
        ></Image>
      </Link>

  );
};

export default ProfileButton;
