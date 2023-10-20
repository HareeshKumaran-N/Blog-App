"use server"
import { fetchAllPosts } from "@/actions/blog.actions";
import Link from "next/link";
import Image from "next/image";
import './Home-Post-section.scss';
import '../../Styles/constants.scss';
import PostCard from "../Post-card/Post-card";

const PostSection=async ()=>{

const response=await fetchAllPosts();
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
          style={{ width: "100%", height: "60vh" }}
        />
        <div className="over-lay">
          <p className="title">{blogList[0]?.title}</p>
          <div className="bottom-area">
            <div className="user-details-wrapper">
              <Image
                src={blogList[0]?.author_id?.profile_pic}
                width={30}
                height={30}
                alt="user-profile"
                className="profile-pic"
              />
              <p>{blogList[0]?.author_id?.username}</p>
            </div>

            <Link href={`/Read/${blogList[0]?._id}`} className="read">
              <span className="material-symbols-rounded">open_in_new</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
    <p className="title">Recent Posts</p>
    <div className="blogs-wrapper">
      {/* excluding the first object we show the rest of the posts as they are sorted acc to views. */}

      {blogList?.map((Post, index) => (
        <PostCard Data={Post} Editable={false} />
      ))}
    </div>
  </div>
);
}

export default PostSection;