"use client";
import "./Post-section.scss";
import { useState, useEffect, useMemo } from "react";
import { fetchAllPosts, getTotalPostCount } from "@/actions/blog.actions";
import PostCard from "@/Components/Post-card/Post-card";
import { useInView } from "react-intersection-observer";
import PostSectionSkeleton from "../Skeletons/Post-section/PostSectionSkeleton";
const PostSection = () => {
  const [Posts, setPost] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPost, setTotalPost] = useState(0);
  const [loading,setLoading]=useState(true);
  const { ref, inView } = useInView();

  async function getPosts() {
    const response= await fetchAllPosts(page);
    setPost(response?.data);
      setLoading(false);
  }

  async function getTotalPost() {
    const response = await getTotalPostCount();
    setTotalPost(response?.data);
  }

  async function getOtherPosts() {
    const response = await fetchAllPosts(page);
    setPost((prev) => [...prev, ...response?.data]);
  }
  useEffect(() => {
    getPosts();
    getTotalPost();
  
  }, []);

  useEffect(() => {
    if (inView && Posts.length===(page*3)) {
      setPage((prev) => prev + 1);
      console.log("inview");
    }
  }, [inView]);

  useEffect(() => {
    if (Posts.length < totalPost) {
      // console.log("api called");
      getOtherPosts();
    }
  }, [page]);

  return (
    <>
      <h1 className="post-section-header">Recent Posts</h1>
      {loading ? (
        <div>
          {/* <h1>Loading</h1> */}
          <PostSectionSkeleton />
        </div>
      ) : (
        <div className="Post-main-wrapper">
          {Posts?.map((blog) => (
            <PostCard Data={blog} />
          ))}
        </div>
      )}

      {Posts?.length > 0 && Posts.length !== totalPost && (
        <div className="loader-wrapper">
          <img
            ref={ref}
            src="loading.gif"
            alt="loader"
            style={{ width: "200px", height: "50px" }}
          />
        </div>
      )}
    </>
  );
};

export default PostSection;
