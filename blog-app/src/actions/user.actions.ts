//user's server actions
"use server";
import userModel from "@/Models/user.model";
import connectToDB from "@/Utils/connectToDB";

export async function createUserActions(reqData)
{
  
  try {
    
    await connectToDB();

    const user = await userModel.findOne({ user_id: reqData.user_id });
    console.log("exists", user);
    if (user) {
      if (user.isOnboarded) {
        return{
          message: "user profile is already present,redirecting home",
          status: "redirect",
          success: true,
        }
      }
    } else {
      console.log("in");
      const newUser = new userModel(reqData);
      await newUser.save();
      return {
        message: "user profile is already created sucessfully",
        status: "ok",
        success: true,
      };
    }
  } catch (error) {
    console.log("user-post API", error);
    return{
      message: `Something went wrong, Error: ${error}`,
      status: "not ok",
      success: false,
    };     
  }

  
}


export async function getUserDetailsAction(clerkId) {
  console.log(clerkId);
  try {
    await connectToDB();
    const user = await userModel.findOne({ user_id: clerkId });

    if (user) {
      return {
        data: user,
        message: "User found",
        successful: true,
      };
    } else {
      return {
        message: "No user found",
        data: {},
        successful: true,
      };
    }
  } catch (error) {
    return {
      successful: false,
    };
  }
}

export async function updateUserDetails(id, updateData) {
  try {
    if (!id) {
      throw new Error("Id  not found");
    }

    const updatedUserProfile = await userModel.findByIdAndUpdate(
      id,
      updateData
    );

    return {
      message: "User Updated",
      success: "true",
      data: updatedUserProfile,
    };
  } catch (error) {
    return {
      message: `Oops something went wrong,Error:${error}`,
      success: "false",
    };
  }
}


