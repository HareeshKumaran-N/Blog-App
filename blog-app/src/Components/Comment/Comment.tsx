"use client";
import "./comment.scss";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { getUserDetailsAction } from "@/actions/user.actions";
import { createComment } from "@/actions/comment.action";

export default function Comment({blog_id,author_id}) {

  const [comment, setComment] = useState("");
  const [showBtnContainer, setBtnContainer] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();
  const [userData,setUserData]=useState({});

  useEffect(() => {
    (comment && comment.length>0)?setBtnContainer(true):setBtnContainer(false);
  }, [comment]);

  const fetchUserdetails=async ()=>{
     const { data, successful } = await getUserDetailsAction(user?.id);    
     console.log(data)
     if(successful)
     {
        console.log("data set");
        setUserData(data);
     }
  }
  useEffect(() => {
    console.log("comment section");
   fetchUserdetails();
  }, [user]);


  const handleSubmit=async ()=>{
    if(comment && comment.length>0 && isSignedIn)
    {
          const {success}=await createComment({
            blog_id,
            owner_id:userData?._id,
            comment,
          });

          if(success)
          { setComment("");
            console.log("comment added");
           
          }
    }

  }

  const handleCancel=()=>{
    setComment("");
  }
  return (
    <div className="add-comment-main-wrapper">
      <div className="add-comment-wrapper">
        <img src={userData?.profile_pic} className="profile" />
        <textarea
          placeholder="Add Your Comment"
          className="TextField"
          value={comment}
          rows={0}
          cols={0}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
      </div>
      {showBtnContainer && (
        <div className="btn-container">
          <span className="material-symbols-rounded" onClick={handleCancel}>
            close
          </span>
          <span className="material-symbols-rounded" onClick={handleSubmit}>
            send
          </span>
        </div>
      )}
    </div>
  );
}
