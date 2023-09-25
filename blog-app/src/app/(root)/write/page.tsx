"use client"
import './write-page.scss'
import Quill from 'quill';
import ImageResize from 'quill-image-resize-module-react';
import ReactQuill from 'react-quill';
import { useState } from 'react';
import  "react-quill/dist/quill.snow.css";
import  "react-quill/dist/quill.bubble.css";
const WritePage=()=>{
Quill.register('modules/imageResize', ImageResize);
    const[blogTitle,setBlogTitle]=useState("");
    const[blogContent,setBlogContent]=useState("");
const  modules  = {
      imageResize: {
     parchment: Quill.import('parchment'),
     modules: ['Resize', 'DisplaySize','Toolbar']
  },
    toolbar: [
        
        [{ font:[] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script:  "sub" }, { script:  "super" }],
        ["blockquote", "code-block"],
        [{ list:  "ordered" }, { list:  "bullet" }],
        ["link","image","video"],
        ["clean"],
    ],
};
console.log(blogContent)
return <>
<div className="Main">

<div className="top-section">
    <p className='message'>Write your blog</p>
     
        <input className="TextField" placeholder='Enter Title'/> 
 </div>    
 {/* blog section */}
 <ReactQuill className='quil-wrapper' modules={modules} theme="snow"  value={blogContent} onChange={setBlogContent} placeholder='Write your Blog' />


</div>
</>
}

export default WritePage;