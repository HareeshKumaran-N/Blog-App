"use server";
import blogModel from "@/Models/blog.model";
import commentModel from "@/Models/comment.model";
import connectToDB from "@/Utils/connectToDB";
import { revalidatePath } from "next/cache";

const createComment = async ({ blog_id, owner_id: author_id, comment }) => {
  console.log("");
  try {
    await connectToDB();
    const newComment = new commentModel({ author_id, comment, blog_id });
    await newComment.save();
    await blogModel.findOneAndUpdate(
      { id: blog_id },
      { $push: { comment: newComment._id } }
    );
    revalidatePath("/Read/[id]");
    return {
      message: `comment added`,
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

const fetchBlogComments = async (blog_id: Object) => {
  try {
    await connectToDB();
    const comments = await commentModel.find({ blog_id }).populate("author_id");

    if (comments.length) {
      return {
        message: "fetched",
        success: true,
        data: comments,
      };
    } else {
      return {
        message: "No comments found",
        success: true,
        data: [],
      };
    }
  } catch (error) {
    console.log("error", error);
    return {
      message: `Oops something went wrong,Error:${error}`,
      success: false,
    };
  }
};

const editCommentAction = async (id:Object, updatedComment:String) => {
  try {

    console.log("Edit Payload",{
      id:id,
      new_comment:updatedComment
    })
     const newComment=await commentModel.findByIdAndUpdate(id,{comment:updatedComment},{new:true});
     
     console.log("new comment",newComment)
     if(newComment.comment===updatedComment)
     {
         revalidatePath("/Read/[id]");
        return {
          message: "comment updated",
          success: true,
          data:newComment,
        };
        
     }


  } catch (error) {
    console.log("error", error);
    return {
      message: `Oops something went wrong,Error:${error}`,
      success: false,
    };
  }
};

export { createComment, fetchBlogComments,editCommentAction};
