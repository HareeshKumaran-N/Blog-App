import mongoose, { Schema,model } from "mongoose";

const blogSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    category:{

        type:String,
        default:"None"    
    },
    blog:{
        type:String,
        required:true
    },
    date:{
        type:Schema.Types.Date,
        required:false,
        default:Date.now
    },
    author_id:{
        // object id
        type:Schema.Types.ObjectId,
        required:true,
        ref:"users"
    },
    cover_url:{
        type:String,
        required:false
    },
    // comment:[
    //     {
    //         type:Schema.Types.ObjectId,
    //         ref:"comments"
    //     }
    // ]
    views:{
        type:Number,
        required:false,
        default:0
    }   
    
    
})

const blogModel=mongoose.models.blogs || model("blogs",blogSchema);

export default blogModel;