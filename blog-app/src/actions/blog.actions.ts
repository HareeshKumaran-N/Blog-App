"use server";

import blogModel from "@/Models/blog.model";
import connectToDB from "@/Utils/connectToDB";
import userModel from "@/Models/user.model";

export const createBlogAction = async (blogObj) => {
  try {
    console.log(blogObj);
    await connectToDB();
    const owner = await userModel.findOne({ user_id: blogObj.author_id });
    console.log("owner_id", owner._id);
    const { title, category, blog, cover_url } = blogObj;
    const newBlog = new blogModel({title,category,blog,author_id:owner._id,cover_url });
    await newBlog.save();

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

      const allBlogs = await blogModel
        .find({})
        .sort({ views: -1 })
        .populate("author_id")
        .exec();
      console.log(allBlogs);
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

export const fetchPostById = async (id) => {
  console.log("Id Passed to read", id);
  try {
    //incrementing views by one.
    const Post = await blogModel.findByIdAndUpdate(id,{ $inc: { views: 1 } },{new:true}).populate("author_id");
    if (Post)
    {
      console.log("PostByID",Post);
return {
  message: "blog fetched",
  success: "true",
  data: Post,
};
    }
    else
      return {
        message: "blog not found",
        success: "false",
        data: {},
      };

      
   
  } catch (error) {
    return {
      message: `Oops something went wrong,Error:${error}`,
      success: "false"
    };
  }
};


export const getPostByAuthorID=async (userID)=>{
  
  try {
 const blogs = await blogModel.find({ author_id: userID });
 console.log("Post related to author",blogs);

 if(blogs.length)
  return {
    message: "blog fetched",
    success: "true",
    data: blogs,
 }
 else
 return {
   message: "No blogs found",
   success: "true",
   data:[]
 };

 
  } catch (error) {
     return {
       message: `Oops something went wrong,Error:${error}`,
       success: "false",
     };
  }
 

  
}

export async function fetchPostDataForEditing(id)
{
  //No increment of views happens here.
  try {
    const blog =  await blogModel.findById(id).populate("author_id");
    
    //this to convert the mongo object to normal object to fix maximum call stack exceeded error.
    const Data=blog?.toObject();

     return {
       message: "found",
       success: "true",
       data:Data,
     };
  } catch (error) {
      return {
        message: `Oops something went wrong,Error:${error}`,
        success: "false",
      };
  }
}


export const UpdateChangesByID=async (id,updateData)=>{
 
  try {
    await blogModel.findByIdAndUpdate(id,updateData);
    return {
      message: "found",
      success: "true",
    };
  } catch (error) {
    return {
      message: `Oops something went wrong,Error:${error}`,
      success: "false",
    };
  }
}