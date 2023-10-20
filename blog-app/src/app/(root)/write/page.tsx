"use client";
import { Component, MouseEvent } from "react";
import "./write-page.scss";
import Quill from "quill";
import Image from "next/image";
import ImageResize from "quill-image-resize-module-react";
import ReactQuill from "react-quill";
import { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import firebase_app from "@/Utils/firebase-config";
import { useRouter } from "next/navigation";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useUser } from "@clerk/nextjs";
import { createBlogAction } from "@/actions/blog.actions";
import CategoryList from "@/Utils/CategoryList";
import { toast } from "react-toastify";
import Painting from '../../../../public/painting.gif';
import PlayGround from "@/Components/Editor/Editor";

const WritePage = () => {
  // const { user } = useUser();
  // const router = useRouter();

  // Quill.register("modules/imageResize", ImageResize);

  // const [blogTitle, setBlogTitle] = useState("");
  // const [blogContent, setBlogContent] = useState("");
  // const [coverImage, setCoverImage] = useState("");
  // const [category, setCategory] = useState("None");
  // const [uploadedURL, setUploadedURL] = useState("");
  // const [image, setImage] = useState();
  // const [isUploading,setIsUploading]=useState(false);


  // const modules = {
  //   imageResize: {
  //     parchment: Quill.import("parchment"),
  //     modules: ["Resize", "DisplaySize", "Toolbar"],
  //   },
  //   toolbar: [
  //     [{ font: [] }],
  //     [{ header: [1, 2, 3, 4, 5, 6, false] }],
  //     ["bold", "italic", "underline", "strike"],
  //     [{ color: [] }, { background: [] }],
  //     [{ script: "sub" }, { script: "super" }],
  //     ["blockquote", "code-block"],
  //     [{ list: "ordered" }, { list: "bullet" }],
  //     ["link", "image", "video"],
  //     ["clean"],
  //   ],
  // };



  // function fileUploadToFirebase(file: File) {
  //   const storage = getStorage(firebase_app);
  //   const uniquename = new Date().getTime + file?.name;
  //   const storageRef = ref(storage, uniquename);
  //   const uploadTask = uploadBytesResumable(storageRef, file);
  //   let promise = uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       const progress =
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       console.log("Upload is " + progress + "% done");
  //       switch (snapshot.state) {
  //         case "paused":
  //           console.log("Upload is paused");
  //           break;
  //         case "running":
  //           console.log("Upload is running");
  //           break;
  //       }
  //     },
  //     (error) => {
  //       switch (error.code) {
  //         case "storage/unauthorized":
  //           break;
  //         case "storage/canceled":
  //           break;

  //         // ...

  //         case "storage/unknown":
  //           break;
  //       }
  //     },
  //     () => {
  //       // Upload completed successfully, now we can get the download URL
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //         console.log(downloadURL);
  //         setUploadedURL(downloadURL);
  //         setIsUploading(false);
  //       });
  //     }
  //   );
  // }

  // useEffect(() => {
  //   if(image?.type?.includes("image")){
  //     setIsUploading(true);
  //  fileUploadToFirebase(image);
  //   }
 
  // }, [image]);

  // const publishBlog = async () => {
  //   if (blogTitle && blogContent && image) {
  //      const response = await createBlogAction({
  //        title: blogTitle,
  //        category: category,
  //        blog: blogContent,
  //        author_id: user?.id,
  //        cover_url: uploadedURL,
  //      });

       

  //       if (response.success) {
  //         toast.success(response.message);
  //         router.push("/");
  //       } else {
  //         toast.error(response.message);
  //       }
  //   }
  //   else if(!image)
  //   {
  //     toast.warn("Provide a cover image");
  //   }
  //   else if(!blogTitle)
  //   {
  //     toast.warn("Provide a title");
  //   }
  //   else if(!blogContent)
  //   {
  //     toast.warn("Provide your content");
  //   }
  // };

  // return (
  //   <>
  //     <div className="Main">
  //       <div className="top-section">
  //         <p className="message">Write your blog</p>

  //         <input
  //           className="TextField"
  //           placeholder="Enter Title"
  //           value={blogTitle}
  //           onChange={(e) => setBlogTitle(e.target.value)}
  //         />
  //       </div>
  //       <div className="cover-image-controller-wrapper">
  //         <label for="file-input">
  //           Upload your cover image
  //           <Image src="/photo.png" width={30} height={30} alt="Image-upload" />
  //         </label>
  //         <input
  //           id="file-input"
  //           type="file"
  //           onChange={(e) => setImage(e.target.files[0])}
  //         />
  //       </div>
  //       {uploadedURL && (
  //         <div className="preview-area">
  //           <img src={uploadedURL} className="cover-image" alt="cover-image" />
  //         </div>
  //       )}
  //       {isUploading && (
  //         // <div className="preview-area">
  //          <Image src={Painting} alt="loading" height={250} width={300}/>
  //         // </div>
  //       )}
  //       {/* blog section */}
  //       <ReactQuill
  //         className="quil-wrapper"
  //         modules={modules}
  //         theme="snow"
  //         value={blogContent}
  //         onChange={setBlogContent}
  //         placeholder="Write your Blog"
  //       />

  //       <div className="publish-container">
  //         <div className="category-wrapper">
  //           <label htmlFor="">Category</label>
  //           <select
  //             className=""
  //             onChange={(e) => {
  //               setCategory(e.target.value);
  //             }}
  //           >
  //             <option className="options">None</option>
  //             {CategoryList.map((item, index) => (
  //               <option value={item} className="options" key={index}>
  //                 {item}
  //               </option>
  //             ))}
  //           </select>
  //         </div>

  //         <button className="publish-button" onClick={publishBlog}>
  //           publish
  //         </button>
  //       </div>
  //     </div>
  //   </>
  // );

  return <PlayGround/>
};

export default WritePage;
