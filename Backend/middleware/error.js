class Errorhandler extends Error {
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode
    }
}


export const errorMiddleware = (err,req,res,next)=>{
    err.message = err.message || "Internal server error!"
    err.statusCode = err.statusCode || 500

    if(err.name === 'CastError'){
        const message = `Response not found| ${err.path}`
        err = new Errorhandler(message,400)
    }

    if(err.code === 11000){
        const message = ` Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new Errorhandler(message,400)
    }
    // console.log(err)//ye error kyu aa rahi hai
    if(err.name === 'JsonWebTokenError'){
        const message = `JsonWebToken is invalid try Again`
        err = new Errorhandler(message,400)
    }
    

    if(err.name === 'TokenExpiredError'){
        const message = `Json web token is expired try again`
         err = new Errorhandler(message,400)
    }


    return res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}

export default Errorhandler