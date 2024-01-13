"use client";
import PlayGround from "@/Components/Editor/Editor";
import { useEffect, useState } from "react";
import { fetchPostDataForEditing } from "@/actions/blog.actions";
import { useUser } from "@clerk/nextjs";
import Loader from "@/Components/Loader/Loader";
import PageTransistionTemplate from "@/Components/Page-transistion-animation/Page-transistion";

const EditPage = ({ params }) => {
    const [blogData,setBlogData]=useState({})
  const getPost = async () => {
    const { data } = await fetchPostDataForEditing(params.id);
    setBlogData(data)
  };
  useEffect(() => {
    getPost();
    console.log("UE Exceeding")
  }, []);
  if(Object.keys(blogData).length)
  return (
    <PageTransistionTemplate>
      <PlayGround Id={params.id} blogData={blogData} mode="editing" />
    </PageTransistionTemplate>
  );
  else
  return <Loader/>

};

export default EditPage;
