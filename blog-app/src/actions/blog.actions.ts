"use server";

import blogModel from "@/Models/blog.model";
import connectToDB from "@/Utils/connectToDB";
import userModel from "@/Models/user.model";

export const createBlogAction = async (blogObj) => {
  try {
    console.log(blogObj);
    await connectToDB();
    const owner = await userModel.findOne({ user_id: blogObj.author_id });
    console.log("owner_id",owner._id);
    const { title, category, blog, cover_url } = blogObj;
    // const newBlog = new blogModel({title,category,blog,author_id:owner._id,cover_url });
    // await newBlog.save();

    return {
      message: "blog created",
      success: "true",
    };
  } catch (error) {
    console.log("error", error);
    return {
      message: `Oops something went wrong,Error:${error}`,
      success: "false",
    };
  }
};

export const fetchAllPosts = async () => {
  try {
    try {
      await connectToDB();

      const allBlogs = await blogModel.find({}).sort({views:-1}).populate("author_id").exec();
      console.log(allBlogs)
      return {
        message: "blogs fetched",
        success: "true",
        data: allBlogs,
      };
    } catch (error) {
      console.log("error", error);
      return {
        message: `Oops something went wrong,Error:${error}`,
        success: "false",
        data: [],
      };
    }
  } catch (error) {
    return {
      message: `Oops something went wrong,Error:${error}`,
      success: "false",
    };
  }
};




