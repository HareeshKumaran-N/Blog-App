import Link from 'next/link';
import './Post-card.scss';
import Image from 'next/image';

function PostCard({Data,Editable})
{
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
          <p>{Data.title}</p>
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
        </div>
      </div>
    );
}

export default PostCard;
