import './Profile-Button.scss';
import Link from "next/link"
import Image from "next/image"
import { useClerk,currentUser } from '@clerk/nextjs';
// import { useEffect,useState } from "react";
import { default_user_profile } from "@/Utils/Constants";
import { getUserDetailsAction } from '@/actions/user.actions';


const ProfileButton=async ()=>{
    const user =await currentUser();

    // const [profilePic,setProfilePic]=useState("");

    // const fetchProfilePic=async ()=>{
   
    //     const res=await fetch(`api/user/${user?.id}`,{
    //       method:"GET",
    //      })

    //     const {data}=await res.json();  
        
    //     setProfilePic(data?.profile_pic);
    // }
   
    const userData=await getUserDetailsAction(user.id);
    const profilePic=userData?.data.profile_pic;
    

//     useEffect(()=>{
// fetchProfilePic().then(()=>console.log("ran"));
// console.log("iser",profilePic);
//     },[user]);

return(
 
    <>
    <Link href="/MyProfile" >
    <Image className="profile-image" src={(profilePic)? profilePic : default_user_profile} width={25} height={25} alt="Profile_pic">

    </Image>
    </Link>
    </>

)


}

export default ProfileButton