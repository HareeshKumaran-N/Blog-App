import HomePostSection from '@/Components/Post_Section/Home-Post-Section';
import './Home-page.scss';
import Welcome from "@/Components/Welcome-banner/Welcome-banner";

export default function Home() {
  return (
    <>
      <Welcome />

      <HomePostSection/>
      
    </>
  );
}
