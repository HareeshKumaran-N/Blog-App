import { fetchPostById } from "@/actions/blog.actions";
import './Read.scss'
import Image from "next/image";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

const ReadPage=async ({params})=>{
  
    TimeAgo.addDefaultLocale(en);
   const timeAgo = new TimeAgo("en-US");
    const {data}=await fetchPostById(params?.id);
    

    return (
      <div className="Main">
        <div className="cover-Image">
          <Image
            src={data.cover_url}
            alt="cover-pic"
            width="500"
            height="500"
            style={{ width: "100%", height: "400px", objectPosition: "center" }}
          />
        </div>
        <div className="blog-details">
          <h1>{data.title}</h1>

          <div className="author-details">
            <span className="time-ago">
              publised {timeAgo.format(data.date - 24 * 60 * 60 * 1000)} by
            </span>
            <div className="author">
              <Image
                src={data.author_id.profile_pic}
                alt="author's profile"
                width={25}
                height={25}
                style={{ borderRadius: "25px" }}
              />
              <span>
                <i>{data.author_id.username}</i>
              </span>
            </div>
          </div>
        </div>

        <div className="blog-content" dangerouslySetInnerHTML={{ __html: data.blog }} />
      </div>
    );
}

export default ReadPage;