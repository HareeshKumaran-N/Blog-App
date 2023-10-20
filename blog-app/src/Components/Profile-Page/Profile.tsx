import Image from "next/image";
import { getPostByAuthorID } from "@/actions/blog.actions";
import './Profile.scss'

export default function Profile({user})
{
  
    const {data:posts}=getPostByAuthorID(user.id);
    const {profile_pic,username,bio}=user;
    
    return (
      <div className="main">
        <div className="user-details-container">
          <Image
            width={200}
            height={200}
            src={profile_pic}
            alt="user profile"
            style={{ width: "20%", height: "250px", borderRadius: "45%" }}
          />
          <p>{username}</p>
          <p className="bio">
            {bio}
          </p>
        </div>
      </div>
    );
}