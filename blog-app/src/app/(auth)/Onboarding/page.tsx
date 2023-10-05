"use client"
import { useEffect, useState } from 'react';
import {currentUser, useClerk,useUser} from "@clerk/nextjs";
import './Onboarding.scss';
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import { default_user_profile } from '@/Utils/Constants';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import firebase_app from "../../../Utils/firebase-config";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation'

const Onboarding=()=>{

  const router = useRouter()

   const [username,setUserName]=useState("");  
   const [userBio,setUserBio]=useState("");
   const [uploadedURL,setUploadedURL]=useState("");
   const {user} =  useClerk();

   const isUserOnboarded=async ()=>{
      
       
        const res=await fetch(`/api/user/${user?.id}`,{
          method:"GET",
         });

        const {data}=await res.json();
         console.log(data);

        if(data?.isOnboarded)
         {
          console.log("@working",isUserOnboarded)
            router.push('/');
         }
         else{
          console.log("nakku")
         }

   }

   useEffect(()=>{

      isUserOnboarded().then(()=>console.log("ran"));
   

   },[user]);


 

function fileUploadToFirebase(file:File)
{
const storage = getStorage(firebase_app);
const uniquename=new Date().getTime+file.name;
const storageRef = ref(storage, uniquename);
const uploadTask = uploadBytesResumable(storageRef, file);


uploadTask.on('state_changed',
  (snapshot) => {

    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {

    switch (error.code) {
      case 'storage/unauthorized':

        break;
      case 'storage/canceled':
    
        break;

      // ...

      case 'storage/unknown':
       
        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log(downloadURL)
      setUploadedURL(downloadURL);
      
    });
  
  }
)

}

    const submitForm=async ()=>{
        
        const {id,primaryEmailAddress}=user;
        
        const data={
            username:username,
            user_id:id,
            profile_pic:uploadedURL,
            email:primaryEmailAddress.emailAddress,
            bio:userBio,
            isOnboarded:true
        }
        
        const res=await fetch('/api/user',{
          method:"POST",
          body:JSON.stringify(data)
         })

         const response=await res.json();
         console.log(response);
         if(response.success)
         {
          toast.success(
            response.message
            );
          router.push('/')  ;
         }
         else{
          toast.error(
            response.message
          );
         }

}

    return(
     <>
    <div className='parent-wrapper'>
    <h1>Create your Profile.</h1>
    <div className="form-wrapper">
        
  <div className='profile-wrapper'>

    <Image src={(uploadedURL)?uploadedURL:default_user_profile} className='profile-pic' width={70} height={70} alt='profile-pic'/>

      <label className='image-label' htmlFor="file-input">
         click to upload profile picture
        <Image src='/photo.png' width={20} height={20} alt='Image-upload'/>
    </label>
     <input  className='image-input'  id="file-input" type="file" onChange={(event)=>fileUploadToFirebase(event.target.files[0])}/>
</div>
   
 <TextField  className="username-field" id="standard-basic" label="username" variant="standard" value={username} onChange={(e)=>{
  setUserName(e.target.value)
 }}/>
   <TextField
          id="outlined-multiline-flexible"
          label="Bio"
          multiline
          rows={4}
          value={userBio} 
          onChange={(e)=>{
          setUserBio(e.target.value)
           }}
        />
    </div>
     
     <button className='submit-btn' onClick={submitForm}>
      Create
     </button>
    </div>
    </> 
    )
}

export default Onboarding