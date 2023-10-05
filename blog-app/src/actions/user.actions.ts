//user's server actions 
"use server";
import userModel from "@/Models/user.model";
import connectToDB from "@/Utils/connectToDB";

export async function getUserDetailsAction(clerkId:String)
{
    console.log(clerkId);
    try {
        await connectToDB();
        const user=await userModel.findOne({user_id:clerkId});

        if(user)
        {
            return {
                data:user,
                message:"User found",
                successful:true
            }

        }
        else
        {
            return {
                message:"No user found",
                data:{},
                 successful:true
            }
        }

    } catch (error) {
        return{
            successful:false,
        }
    }
}