import mongoose,{ Schema,model } from "mongoose";

const commentSchema=new Schema({
    owner_id:{
        type:String,
        required:true,
        ref:"users"
    },
    comment:{
        type:Schema.Types.String,
        required:true
    },
    blog_id:
    {
    type:Schema.Types.ObjectId,
        required:true,
        ref:"blogs"
    }
})

const commentModel=mongoose.models.comments || model("comments",commentSchema);