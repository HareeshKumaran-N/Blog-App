import mongoose,{ Schema,model } from "mongoose";

const commentSchema=new Schema({
    author_id:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"users"
    },
    comment:{
        type:String,
        required:true
    },
    blog_id:
    {
    type:Schema.Types.ObjectId,
        required:true,
        ref:"blogs"
    },
    isPinned:{
        type:Boolean,
        default:false,
        required:false
    }
})

const commentModel=mongoose.models?.comments || model("comments",commentSchema);
export default commentModel;
