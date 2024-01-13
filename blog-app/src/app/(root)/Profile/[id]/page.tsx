import './Profile.scss'
import { getUserByID } from "@/actions/user.actions";
import { getPostByAuthorID } from "@/actions/blog.actions";
import Image from 'next/image';
import PostCard from '@/Components/Post-card/Post-card';
import PageTransistionTemplate from '@/Components/Page-transistion-animation/Page-transistion';
const ProfilePage=async ({params})=>{
  const userResponse = await getUserByID(params.id);
  const blogResponse = await getPostByAuthorID(params.id);
  const { data: userData } = userResponse;
  const { data: blogData } = blogResponse;

  return (
    <PageTransistionTemplate>
      <div className="profile-main">
        <div className="welcome-gradient" />
        <p className="header">
          {userData?.username}
          's profile.
        </p>
        <div className="user-profile">
          <Image
            width={1200}
            height={1200}
            src={userData?.profile_pic}
            alt="user profile"
            style={{ width: "20%", height: "275px", borderRadius: "50%" }}
          />
          <p className="username">{userData?.username}</p>
          <p className="bio">{userData.bio}</p>
        </div>

        {blogData?.length > 0 ? (
          <>
            <p className="header">Posts</p>
            <div className="blogs-wrapper">
              {blogData?.map((item) => (
                <PostCard Data={item} />
              ))}
            </div>
          </>
        ) : (
          <p className="no-posts-msg">
            {userData?.username} hasn't posted yet.
          </p>
        )}
      </div>
    </PageTransistionTemplate>
  );
}
export default ProfilePage;