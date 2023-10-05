"use server"
import { fetchAllPosts } from "@/actions/blog.actions";
import Link from "next/link";
import Image from "next/image";
import Card from "@mui/material/Card";
import { Button, CardActionArea, CardActions } from "@mui/material";
import './Post-section.scss';
const PostSection=async ()=>{

const response=await fetchAllPosts();
console.log(response);



       const blogList = response.data;
  
      console.log(blogList);    


return (
  <div className="main-wrapper">
    <div className="most-viewed-post-wrapper">
      <p className="title">Trending Post</p>
      <div className="most-viewed-post-container">
        <Image
          src={blogList[0]?.cover_url}
          alt="cover-image"
          width={0}
          height={0}
          sizes="100vw"
          className="image"
          style={{ width: "100%", height: "50vh" }}
        />
        <div className="over-lay">
          <p>{blogList[0]?.title}</p>
        </div>
      </div>
    </div>
  </div>
);
}

export default PostSection;