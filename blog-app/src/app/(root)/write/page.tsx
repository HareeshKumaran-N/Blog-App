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
import blogModel from "@/Models/blog.model";
import firebase_app from "@/Utils/firebase-config";
import { useRouter } from "next/navigation";

// Firebase
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
const WritePage = () => {
  const { user } = useUser();
  const router = useRouter();

  Quill.register("modules/imageResize", ImageResize);

  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [category, setCategory] = useState("None");
  const [uploadedURL, setUploadedURL] = useState("");
  const [image, setImage] = useState();

  const modules = {
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize", "Toolbar"],
    },
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  function fileUploadHandler(event: MouseEvent<HTMLButtonElement>) {
    if (
      event.target.files.length > 0 &&
      event.target.files[0].type.includes("image")
    ) {
      let src = URL.createObjectURL(event.target.files[0]);
      setFile(event.target.files[0]);
      setCoverImage(src);
    }
  }

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
          setUploadedURL(downloadURL);
        });
      }
    );
  }

  useEffect(() => {
    if(image?.type?.includes("image")){
   fileUploadToFirebase(image);
    }
 
  }, [image]);

  const publishBlog = async () => {
    if (blogTitle && blogContent && image) {
       const response = await createBlogAction({
         title: blogTitle,
         category: category,
         blog: blogContent,
         author_id: user?.id,
         cover_url: uploadedURL,
       });

       

        if (response.success) {
          toast.success(response.message);
          router.push("/");
        } else {
          toast.error(response.message);
        }
    }
  };

  return (
    <>
      <div className="Main">
        <div className="top-section">
          <p className="message">Write your blog</p>

          <input
            className="TextField"
            placeholder="Enter Title"
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
          />
        </div>
        <div className="cover-image-controller-wrapper">
          <label for="file-input">
            Upload your cover image
            <Image src="/photo.png" width={30} height={30} alt="Image-upload" />
          </label>
          <input
            id="file-input"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        {uploadedURL &&
          <div className="preview-area">
            <img src={uploadedURL} className="cover-image" alt="cover-image" />
          </div>
        }

        {/* blog section */}
        <ReactQuill
          className="quil-wrapper"
          modules={modules}
          theme="snow"
          value={blogContent}
          onChange={setBlogContent}
          placeholder="Write your Blog"
        />

        <div className="publish-container">
          <div className="category-wrapper">
            <label htmlFor="">Category</label>
            <select
              className=""
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option className="options">None</option>
              {CategoryList.map((item, index) => (
                <option value={item} className="options" key={index}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <button className="publish-button" onClick={publishBlog}>
            publish
          </button>
        </div>
      </div>
    </>
  );
};

export default WritePage;
