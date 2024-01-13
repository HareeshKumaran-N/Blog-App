"use server"
import { fetchTrendingPost } from "@/actions/blog.actions";
import Link from "next/link";
import Image from "next/image";
import './Trending-Post-section.scss';
import '../../Styles/constants.scss';
import { currentUser } from "@clerk/nextjs";




const TrendingPostSection=async ()=>{

const response=await fetchTrendingPost();
const blog = response.data; 
const user = await currentUser();





return (
  <div className="main-wrapper">
    <div className="most-viewed-post-wrapper">
      <h1 className="trending-post-header">Trending Post</h1>
      <div className="most-viewed-post-container">
        <Image
          src={blog[0]?.cover_url}
          alt="cover-image"
          width={0}
          height={0}
          sizes="100vw"
          className="image"
          // style={{ width: "100%", height: "60vh" }}
        />
        <div className="over-lay">
          <p className="title">{blog[0]?.title}</p>
          <div className="bottom-area">
            <Link
              href={
                blog[0]?.author_id?.user_id === user?.id
                  ? "/MyProfile"
                  : `/Profile/${blog[0]?.author_id._id}`
              }
            >
              <div className="user-details-wrapper">
                <Image
                  src={blog[0]?.author_id?.profile_pic}
                  width={0}
                  height={0}
                  sizes="100vw"
                  alt="user-profile"
                  className="profile-pic"
                />
                <p>{blog[0]?.author_id?.username}</p>
              </div>
            </Link>

            <Link href={`/Read/${blog[0]?._id}`} className="read">
              <span className="material-symbols-rounded">open_in_new</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

export default TrendingPostSection;