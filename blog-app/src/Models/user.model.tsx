import mongoose, { Schema,model } from "mongoose";

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
    },
    user_id:{
        //clerk's user-ID
        type:String,
        required:true,
        unique:true
    },
    profile_pic:{
        type:String,
        default:"https://www.vhv.rs/dpng/d/312-3120300_default-profile-hd-png-download.png"
    },
    email:{
        type:String,
        required:true,
    },
    bio:{
        type:String
    },
    isOnboarded:{
        type:Schema.Types.Boolean,
        default:false,
    }   

})

const userModel=mongoose.models.users || model('users',userSchema);

export default userModel;