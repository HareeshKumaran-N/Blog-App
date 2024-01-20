import { fetchPostById } from "@/actions/blog.actions";
import "./Read.scss";
import Image from "next/image";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import AddComment from "@/Components/Comment/Comment";
import { currentUser } from "@clerk/nextjs";
import { fetchBlogComments } from "@/actions/comment.action";
import PageTransistionTemplate from "@/Components/Page-transistion-animation/Page-transistion";
import CommentCard from "@/Components/Comment-card/Comment-card";

const ReadPage = async ({ params }) => {
  TimeAgo.addDefaultLocale(en);
  const timeAgo = new TimeAgo("en-US");
  const { data } = await fetchPostById(params?.id);
  const user = await currentUser();
  const { data: commentData } = await fetchBlogComments(params.id);


  console.log("comments", commentData);
  return (
    <PageTransistionTemplate>
    <div className="Main">
  
        <Image
          src={data?.cover_url}
          alt="cover-pic"
          width="1500"
          height="1500"
          className="cover-image"
        />

      <div className="blog-details">
        <h1>{data?.title}</h1>

        <div className="author-details">
          <span className="time-ago">
            publised {timeAgo.format(data?.date - 24 * 60 * 60 * 1000)} by
          </span>
          <div className="author">
            <Image
              src={data?.author_id.profile_pic}
              alt="author's profile"
              width={25}
              height={25}
              style={{ borderRadius: "25px" }}
            />
            <span>
              <i>{data?.author_id.username}</i>
            </span>
          </div>
        </div>
      </div>
    
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: data?.blog }}
      />

      <p className="comment">
        {commentData?.length ? commentData?.length : ""} Comments
      </p>
      {user?.id && (
        <AddComment blog_id={data?._id} author_id={data?.author_id._id} />
      )}

      <div className="comment-section">
        {commentData?.length ? (
          commentData?.map((item) => (
            <CommentCard
              commentID={item._id}
              ownerID={item.author_id.user_id}
              comment={item.comment}
              username={item.author_id.username}
              profilePic={item.author_id.profile_pic}
            />
          ))
        ) : (
          <p>NO Comments found</p>
        )}
      </div>
    </div>
    </PageTransistionTemplate>
  );
};

export default ReadPage;
