import { User } from '../model/userSchema.js'
import { catchAsyncError } from '../middleware/catchAsyncError.js'
import Errorhandler from '../middleware/error.js'
// import { sendToken } from '../utils/jwttoken.js'



// register Teachers
export const registerTeacher = catchAsyncError(async(req,res,next)=>{
    const {
        name,
        email,
        password,
        age,
        imgSrc,
        address,
        phone,
        teacherSalary,
        teacherSubject,
      } = req.body

      if(
        !name ||
        !email ||
        !password ||
        !age ||
        !imgSrc ||
        !address ||
        !phone ||
        !teacherSalary ||
        !teacherSubject 
      ){
        return next(new Errorhandler("Please fill full the form",400))
      }

      const authRole = await req.user.role

      if(authRole !== 'Principle'){
        return next(new Errorhandler("User not allowed with this role",400))
      }
    
      const isEmail = await User.findOne({ email })
      if (isEmail) {
        return next(new Errorhandler('Teacher already Registered', 400))
      }
      const user = await User.create({
        name,
        email,
        password,
        age,
        imgSrc,
        address,
        phone,
        role:"Teacher",
        teacherSalary,
        teacherSubject,
      })

      const token = await user.getJWTToken()

    res.status(201).json({
        success:true,
        message:"Teacher Registered Successfully...",
        user,
        token
    })
})

// register principle
export const registerPrinciple = catchAsyncError(async(req,res,next)=>{

    const {
        name,
        email,
        password,
        age,
        imgSrc,
        address,
        phone,
      } = req.body

      if(
        !name ||
        !email ||
        !password ||
        !age ||
        !imgSrc ||
        !address ||
        !phone 
      ){
        return next(new Errorhandler("Please fill full the form",400))
      }

      const authRole = await req.user.role

      if(authRole !== 'Principle'){
        return next(new Errorhandler("Student's and Teacher in not Allowed to add principle",400))
      }
    
      const isEmail = await User.find()
      if (isEmail) {
        return next(new Errorhandler('Only One Principle allowed in this Schoole..', 400))
      }
      const user = await User.create({
        name,
        email,
        password,
        age,
        imgSrc,
        address,
        phone,
        role:"Principle",
      })
    //   sendToken(user,200,res,"Teacher Registered Suiccessfully...")
      const token = await user.getJWTToken()

      const options ={
          expires: new Date(
              Date.now() + 5+ 24 * 60 * 60 *1000
          ),
          httpOnly:true,
      };
      
  
      res.status(201).cookie('token',token,options).json({
          success:true,
          message:"Principle Registerd Successfully...",
          user,
          token
      })

})

// allteachers And Principle

export const allTeachers = catchAsyncError(async(req,res,next)=>{
    const students = await User.find({role:'Teacher'})
    res.status(200).json({
        success:true,
        students
    })
})

export const principle = catchAsyncError(async(req,res,next)=>{
  const prince = await User.find({role:'Principle'})
  res.status(200).json({
      success:true,
      prince
  })
})


export const onlyoneTeacherDetail=catchAsyncError(async(req,res,next)=>{
  const {id} = req.params;
  const teacher = await User.findById(id)
  res.status(200).json({
    success:true,
    teacher
  })
})