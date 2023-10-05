import mongoose from "mongoose";

let isConnected:Boolean=false;
const connectToDB=async ()=>{
    mongoose.set("strictQuery",true);

    if(!process.env.MONGO_URL)
    {
        console.log('Mongo_URL is not found');
        return;
    }

    if(isConnected)
    {
        console.log("DB is connected already");
    }

    try {
        await mongoose.connect(process.env.MONGO_URL);
        isConnected=true;
        console.log('is connected');
    } catch (error) {
        console.log("Mongo DB",error);
    }

}

export default connectToDB;