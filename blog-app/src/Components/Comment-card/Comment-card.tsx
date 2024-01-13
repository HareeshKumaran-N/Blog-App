"use client";
import { useState } from "react";
import "./comment-card.scss";
import { useUser } from "@clerk/nextjs";
import { editCommentAction } from "@/actions/comment.action";
import { toast } from "react-toastify";
const CommentCard = ({ commentID, ownerID, username, profilePic, comment }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [isEditEnabled, setEditEnabled] = useState(false);
  const [editComment, setEditComment] = useState(comment);
  const handleEdit = async () => {
    if(editComment===comment)
    {
      toast.warn("No changes found");
      return;
    }
    const response=await editCommentAction(commentID,editComment);
     console.log("Response after edit", response);
    if(response?.success)
    {

    toast("your comment is updated");
    setEditEnabled(false);
    }
    else
    toast("Something went wrong");
    
  };


  return (
    <div className="super-wrapper">
      <div className="comment-wrapper">
          <img src={profilePic} alt="" className="profile" />
          <div className="right-wrapper">
            <p className="username">{username}</p>
            {isEditEnabled ? (
              <textarea
                placeholder="Add Your Comment"
                className="TextField"
                value={editComment}
                rows={0}
                cols={0}
                onChange={(e) => {
                  setEditComment(e.target.value);
                }}
              />
            ) : (
              <p className="comment">{comment}</p>
            )}
          </div>
      </div>
      {
       isLoaded && isSignedIn && user.id === ownerID && (
         <div className="btn-container">
           {isEditEnabled ? (
             <>
               <span
                 className="material-symbols-rounded"
                 onClick={() => {
                   setEditEnabled(false);
                 }}
               >
                 close
               </span>
               <span className="material-symbols-rounded" onClick={handleEdit}>
                 send
               </span>
             </>
           ) : (
             <>
               <span
                 className="material-symbols-rounded"
                 onClick={() => setEditEnabled((pre) => !pre)}
               >
                 edit
               </span>
               <span className="material-symbols-rounded">delete</span>
             </>
           )}
         </div>
       )
     }
    </div>
  );
};

export default CommentCard;
 