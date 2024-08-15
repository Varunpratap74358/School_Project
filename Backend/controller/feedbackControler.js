import { FeedBack } from "../model/feedbackSchema.js";
import { catchAsyncError } from '../middleware/catchAsyncError.js'
import Errorhandler from '../middleware/error.js'

export const sendFeedBack = catchAsyncError(async(req,res,next)=>{
    const {name,email,phone,message} = req.body
    const feedback =await FeedBack.create({
        name,email,phone,message
    })

    res.status(201).json({
        success:true,
        message:"Send Feed Back successfully..."
    })
})


export const getallFeedback = catchAsyncError(async(req,res,next)=>{
    const role =await req.user.role
    if(role !== 'Principle'){
        return next(new Errorhandler("Only Principle can see the feed backs",400))
    }
    const feedback = await FeedBack.find()
    if(!feedback){
        return next(new Errorhandler("Feedback not found...",400))
    }
    res.status(200).json({
        success:true,
        feedback
    })
})


export const deleteFeedback = catchAsyncError(async(req,res,next)=>{
    const role =await req.user.role
    const {id} = req.params
    if(role !== 'Principle'){
        return next(new Errorhandler("Only Principle can see the feed backs",400))
    }
    const feedback = await FeedBack.findByIdAndDelete(id)
    if(!feedback){
        return next(new Errorhandler("invalid feedback",400))
    }
    res.status(201).json({
        success:true,
        message:"Feedback deleted successfully..."
    })
})