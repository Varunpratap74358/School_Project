import { catchAsyncError } from "./catchAsyncError.js";
import Errorhandler from "./error.js";
import jwt from 'jsonwebtoken'
import { User } from "../model/userSchema.js";

export const isAuthorized = catchAsyncError(async(req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return next(new Errorhandler('User Not Authorized',400))
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
     req.user =await User.findById(decoded.id)
     next()
})