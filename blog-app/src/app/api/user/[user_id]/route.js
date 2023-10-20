import connectToDB from '../../../../Utils/connectToDB';
import {NextResponse} from 'next/server';
import userModel from '../../../../Models/user.model';


export async function GET (req,{params})
{

try {
       console.log("get-user-api",params);
        await connectToDB();
    const user=await userModel.findOne({user_id:params.user_id});

     if(user)
        {
            if(user.isOnboarded){
              return NextResponse.json({
                message:"user profile is found",
                status:"redirect",
                success:true,
                data:user
            })
            
            }      
        }
        else
        {
           
         
               return NextResponse.json({
                message:"user profile not found",
                status:"ok",
                success:true,
                data:user
            })
        

        }

} catch (error) {
   
}
}