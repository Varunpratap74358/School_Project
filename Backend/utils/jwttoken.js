export const sendToken = async(user,statusCode,res,message)=>{
    const token = await user.getJWTToken()
    const options ={
        expires: new Date(
            Date.now() + 5+ 24 * 60 * 60 *1000
        ),
        httpOnly:true,
    };
    res.status(statusCode).cookie('token',token,options).json({
        success:true,
        message,
        user,
        token
    })
}