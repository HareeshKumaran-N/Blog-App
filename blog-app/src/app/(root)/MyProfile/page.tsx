"use client";
import "./Profile-page.scss";
import Profile from "@/Components/My-Profile-Page/My-Profile";
import {
  getUserDetailsAction,
  updateUserDetails,
} from "@/actions/user.actions";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { fetchPostById, getPostByAuthorID } from "@/actions/blog.actions";
import { useState, useEffect, useTransition } from "react";
import { SignOutButton } from "@clerk/nextjs";
import '@/Styles/constants.scss';

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import firebase_app from "@/Utils/firebase-config";
import imageUpload from "../../../../public/painting.gif";
import { toast } from "react-toastify";
import { Box, Modal, Typography } from "@mui/material";
import PostCard from "@/Components/Post-card/Post-card";
import PageTransistionTemplate from "@/Components/Page-transistion-animation/Page-transistion";

export default function MyProfilePage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [isEditEnabled, setEditEnable] = useState(false);
  const [showSubmitChanges, setShowSubmitChanges] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [username, setUserName] = useState("");
  const [userBio, setUserBio] = useState("");
  const [userDBData, setUserDBData] = useState({});
  const [isImageUploadPending, setIsImageUploading] = useState(false);
  const [showModal, setModal] = useState(false);
  const[blogs,setBlogs]=useState([]);

  function fileUploadToFirebase(file: File) {
    const storage = getStorage(firebase_app);
    const uniquename = new Date().getTime + file?.name;
    const storageRef = ref(storage, uniquename);
    const uploadTask = uploadBytesResumable(storageRef, file);
    let promise = uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;

          // ...

          case "storage/unknown":
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);

          setProfilePic(downloadURL);
          setIsImageUploading(false);
          setShowSubmitChanges(true);
        });
      }
    );
  }

  const fetchUserByClerkId = async () => {
    const { data } = await getUserDetailsAction(user?.id);
   const { data: BlogData } = await getPostByAuthorID(data._id);
   //user related stuffs.
    setUserDBData(data);
    setUserName(data.username);
    setProfilePic(data.profile_pic);
    setUserBio(data.bio);

    //blogs of the user
    setBlogs(BlogData);
    console.log(BlogData);
    
  };

  useEffect(() => {
    fetchUserByClerkId();
    

  }, [user]);

  const saveChanges = async () => {
    //check if the actual data is changed or not.
    //if changed pass only the changed ones to update action.
    //setisEditEnabled to false;
    const modifiedFields = {};

    if (userDBData.username !== username) {
      modifiedFields.username = username;
    }
    if (userDBData.bio !== userBio) {
      modifiedFields.bio = userBio;
    }
    if (userDBData.profile_pic !== profilePic) {
      modifiedFields.profile_pic = profilePic;
    }

    if (Object.keys(modifiedFields).length) {
      const response = await updateUserDetails(userDBData?._id, modifiedFields);
      setUserDBData(response.data);

      toast.success("Profile Updated 🤩");
      setEditEnable(false);
    } else {
      toast.warn("No Changes Made ⚠️");
    }
  };

  const resetData = () => {
    setUserBio(userDBData.bio);
    setProfilePic(userDBData.profile_pic);
    setUserName(userDBData.username);
  };

  const style = {
    position: "absolute" as "absolute",
    display:"flex",
    flexDirection:"column",
    // justifyContent:"space-around",,;
    alignItems:"center",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    // bgcolor: "background.paper",
    border: "none",
    borderRadius: "20px",
    boxShadow: 24,
    p: 4,
    backgroundImage: "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)",
  };

  return (
    <PageTransistionTemplate>
      <div className="main">
        <div className="profile-controller-wrapper">
          <p className="header">
            {!isEditEnabled ? "Your Profile" : "Edit Your Profile"}
          </p>
          <div className="button-container">
            <button
              className="edit-btn"
              onClick={() => {
                if (isEditEnabled) {
                  resetData();
                }
                setEditEnable((prev) => !prev);
              }}
            >
              <span className="material-symbols-rounded">
                {!isEditEnabled ? "edit" : "close"}
              </span>
            </button>
            <button className="logout-btn" onClick={() => setModal(true)}>
              <span className="material-symbols-rounded">logout</span>
            </button>
          </div>
        </div>
        <div className="user-details-container">
          <div className="welcome-gradient" />
          {isImageUploadPending ? (
            <>
              <Image
                width={200}
                height={200}
                src={imageUpload}
                alt="user profile"
                style={{ width: "20%", height: "250px", borderRadius: "50%" }}
              />
            </>
          ) : (
            <Image
              width={1200}
              height={1200}
              src={profilePic}
              alt="user profile"
              className="profile-pic"
            />
          )}

          {isEditEnabled && (
            <>
              <label
                htmlFor="profile-pic-upload"
                className="profile-pic-uploader"
              >
                <input
                  type="File"
                  id="profile-pic-upload"
                  onChange={(e) => {
                    if (e.target?.files[0]) {
                      fileUploadToFirebase(e.target?.files[0]);
                      setIsImageUploading(true);
                    }
                  }}
                />
                Set New Profile Pic
                <span className="material-symbols-rounded">upload</span>
              </label>
            </>
          )}

          {!isEditEnabled ? (
            <>
              <p className="username">{username}</p>{" "}
              <p className="bio">{userBio}</p>
            </>
          ) : (
            <>
              <label htmlFor="">Edit Username</label>
              <input
                value={username}
                onChange={(e) => {
                  setShowSubmitChanges(true);
                  setUserName(e.target.value);
                }}
              />
              <label htmlFor="">Edit Bio</label>
              <textarea
                rows={4}
                value={userBio}
                onChange={(e) => {
                  setShowSubmitChanges(true);
                  setUserBio(e.target.value);
                }}
              />
            </>
          )}

          {/* <p className="bio">{userBio}</p> */}

          {showSubmitChanges && isEditEnabled && (
            <button
              className="save-changes-btn"
              onClick={() => {
                saveChanges();
              }}
            >
              Save Changes
            </button>
          )}
        </div>
        {!blogs?.length ? (
          <div>No Posts</div>
        ) : (
          <div>
            <p className="post-header">Your Posts</p>
            <div className="blogs-wrapper">
              {blogs.map((blog, index) => (
                <PostCard Data={blog} Editable={true} />
              ))}
            </div>
          </div>
        )}

        <Modal
          open={showModal}
          onClose={() => setModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="Modal">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you Sure !
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <SignOutButton>
                <button className="sign-out-btn">Sign out</button>
              </SignOutButton>
            </Typography>
          </Box>
        </Modal>
      </div>
    </PageTransistionTemplate>
  );
}
