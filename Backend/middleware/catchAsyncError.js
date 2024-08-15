export const catchAsyncError = (theFun)=>{
    return(req,res,next)=>{
        Promise.resolve(theFun(req,res,next)).catch(next)
    }
}