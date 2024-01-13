"use server";

import blogModel from "@/Models/blog.model";
import connectToDB from "@/Utils/connectToDB";
import userModel from "@/Models/user.model";
import { revalidatePath } from "next/cache";

//function is used to check for skeleton feature.
import pauseFunction from "@/Utils/pause-function";



export const createBlogAction = async (blogObj) => {
  try {
    console.log(blogObj);
    await connectToDB();
    const owner = await userModel.findOne({ user_id: blogObj.author_id });
    console.log("owner_id", owner._id);
    const { title, category, blog, cover_url } = blogObj;
    const newBlog = new blogModel({title,category,blog,author_id:owner._id,cover_url });
    await newBlog.save();
    revalidatePath('/');
    return {
      message: "blog created",
      success: true,
    };
  } catch (error) {
    console.log("error", error);
    return {
      message: `Oops something went wrong,Error:${error}`,
      success: false,
    };
  }
};


export const fetchTrendingPost=async()=>{
  try {
    //  await pauseFunction(5000)
     await connectToDB();

      const TrendingBlog = await blogModel
        .find({})
        .sort({ views: -1 })
        .populate("author_id")
        .limit(1)
        .exec();

      
      return {
        message: "blogs fetched",
        success: true,
        data: TrendingBlog,
      };

  } catch (error) {
    return {
      message: `Oops something went wrong,Error:${error}`,
      success: false,
    }; 
  }
}

// infinite scroll feature
export const fetchAllPosts = async (page:number) => {
  try {
    try {
      await connectToDB();
      // await pauseFunction(10000)
      const limit = 3;
      const skip = (page - 1) * limit;
      const allBlogs = await blogModel
        .find({})
        .sort({ views: -1 })
        .populate("author_id")
        .skip(skip)
        .limit(limit)
        .lean();

      console.log("page", page);
      console.log("fetchedBlog", allBlogs);
      return {
        message: "blogs fetched",
        success: true,
        data: allBlogs,
      };
    } catch (error) {
      console.log("error", error);
      return {
        message: `Oops something went wrong,Error:${error}`,
        success: false,
        data: [],
      };
    }
  } catch (error) {
    return {
      message: `Oops something went wrong,Error:${error}`,
      success: false,
    };
  }
};

export const getTotalPostCount=async ()=>
{
  try {
    await connectToDB();
    const count=await blogModel.find({}).count();

    return{
      message:"Fetched counts",
      data:count,
      success:true,
    }
  } catch (error) {
     return {
      message: `Oops something went wrong,Error:${error}`,
      success: false,
    }; 
  }
}

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
  success: true,
  data: Post,
};
    }
    else
      return {
        message: "blog not found",
        success: false,
        data: {},
      };

      
   
  } catch (error) {
    return {
      message: `Oops something went wrong,Error:${error}`,
      success: false
    };
  }
};


export const getPostByAuthorID=async (userID)=>{
  
  try {
 const blogs = await blogModel.find({ author_id: userID }).populate('author_id').lean();


 if(blogs.length)
  return {
    message: "blog fetched",
    success: true,
    data: blogs,
 }
 else
 return {
   message: "No blogs found",
   success: true,
   data:[]
 };

 
  } catch (error) {
     return {
       message: `Oops something went wrong,Error:${error}`,
       success: false,
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
       success: true,
       data:Data,
     };
  } catch (error) {
      return {
        message: `Oops something went wrong,Error:${error}`,
        success: false,
      };
  }
}


export const UpdateChangesByID=async (id,updateData)=>{
 
  try {
    await blogModel.findByIdAndUpdate(id,updateData);
    return {
      message: "found",
      success: true,
    };
  } catch (error) {
    return {
      message: `Oops something went wrong,Error:${error}`,
      success: false,
    };
  }
}







