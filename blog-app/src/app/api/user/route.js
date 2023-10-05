import connectToDB from '../../../Utils/connectToDB';
import {NextResponse} from 'next/server';
import userModel from '../../../Models/user.model';


export async function POST(req) //handles creating new user. 
{
    try {
        const reqData=await req.json();
        
       
        await connectToDB();

        const user=await userModel.findOne({user_id:reqData.user_id});
        console.log("exists",user)
        if(user)
        {
            if(user.isOnboarded){
              return NextResponse.json({
                message:"user profile is already present,redirecting home",
                status:"redirect",
                success:true
            })
            }
          
        
        }
        else
        {
            console.log("in");
            const newUser=new userModel(reqData);
            await newUser.save();
               return NextResponse.json({
                message:"user profile is already created sucessfully",
                status:"ok",
                success:true
            })
        

        }



    } catch (error) {
        console.log('user-post API',error);
         return NextResponse.json({
                message:`Something went wrong, Error: ${error}`,
                status:"not ok",
                success:false
            })        
    }
}


