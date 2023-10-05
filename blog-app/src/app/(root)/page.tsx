import PostSection from '@/Components/Post_Section/Post-Section';
import './Home-page.scss';
import Welcome from "@/Components/Welcome-banner/Welcome-banner";

export default function Home() {
  return (
    <>
      <Welcome />
      {/* <div className="trending-post">

  </div> */}
      <PostSection/>
    </>
  );
}
