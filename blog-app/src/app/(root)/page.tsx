import Trending from "@/Components/Trending_Post_Section/Trending-Post-Section";
import "./Home-page.scss";
import Welcome from "@/Components/Welcome-banner/Welcome-banner";
import PostSection from "@/Components/Post-section/Post-section";
import PageTransistionTemplate from "@/Components/Page-transistion-animation/Page-transistion";
import { Suspense } from "react";
import SkeletonTrendingPost from "@/Components/Skeletons/Trending-Post/SkeletonTrendingPost";

export default function Home() {

  return (
    <PageTransistionTemplate>
      <Welcome />
      <Suspense fallback={<SkeletonTrendingPost />}>
        <Trending />
      </Suspense>


        <PostSection />

    </PageTransistionTemplate>
  );
}
