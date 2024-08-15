import mongoose from "mongoose";

const feedBackSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    message:{
        type:String,
        required:true
    },
})

export const FeedBack = mongoose.model('FeedBack',feedBackSchema)