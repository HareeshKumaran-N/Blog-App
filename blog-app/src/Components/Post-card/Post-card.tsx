"use client";
import Link from 'next/link';
import './Post-card.scss';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
function PostCard({Data,Editable=false})
{
  const {isLoaded,isSignedIn,user}=useUser();

    return (
      <div className="card-main">
        <Image
          src={Data.cover_url}
          alt="cover-image"
          width={0}
          height={0}
          sizes="100vw"
          className="cover-image"
          //   style={{ width: "100%", height: "350px" }}
        />

        <div className="overlay">
          <p className='blog-title'>{Data.title}</p>
          <Link
            href={
              Data.author_id.user_id === user?.id ? "/MyProfile" : `/Profile/${(Data.author_id._id)}`
         }
          >
            <div className="overlay-bottom-wrapper">
              <div className="overlay-bottom-left-wrapper">
                {!Editable ? (
                  <>
                    {" "}
                    <Image
                      src={Data.author_id.profile_pic}
                      alt="profile-pic"
                      sizes="100vw"
                      width={30}
                      height={30}
                      className="profile-pic"
                    />
                    <span>{Data.author_id.username}</span>
                  </>
                ) : (
                  <Link href={`/Edit/${Data._id}`} className="read">
                    <span class="material-symbols-rounded">edit_note</span>
                  </Link>
                )}
              </div>

              <Link href={`/Read/${Data._id}`} className="read">
                <span className="material-symbols-rounded">open_in_new</span>
              </Link>
            </div>
          </Link>
        </div>
      </div>
    );
}

export default PostCard;
