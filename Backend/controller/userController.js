import { User } from '../model/userSchema.js'
import { catchAsyncError } from '../middleware/catchAsyncError.js'
import Errorhandler from '../middleware/error.js'



// register student
export const registerStudent = catchAsyncError(async (req, res, next) => {
  const {
    name,
    email,
    password,
    age,
    imgSrc,
    address,
    phone,
    NameClass,
    stuFees,
    stuPayedFees,
    subjects,
  } = req.body

  if (
    !name ||
    !email ||
    !password ||
    !age ||
    !imgSrc ||
    !address ||
    !phone ||
    // !role ||
    !NameClass ||
    !stuFees ||
    !subjects
  ) {
    return next(new Errorhandler('Please fill full the form...', 400))
  }

  const authRole = req.user.role;

  if (authRole == 'Student') {
    return next(
      new Errorhandler(
        'Only Teacher and Principle allowed to register student',
        400,
      ),
    )
  }
  const isEmail = await User.findOne({ email })
  if (isEmail) {
    return next(new Errorhandler('Student already Registered', 400))
  }

  const user = await User.create({
    name,
    email,
    password,
    age,
    imgSrc,
    address,
    phone,
    role: 'Student',
    NameClass,
    stuFees,
    stuPayedFees,
    subjects,
    teacherSubject: undefined,
  })

//   sendToken(user, 200, res, 'Student Registered Successfully...')

    const token = await user.getJWTToken()

    res.status(201).json({
        success:true,
        message:"Student Registered successfully...",
        token,
        user
    })
})


// login  users
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password, role } = req.body
  if (!email || !password || !role) {
    return next(new Errorhandler('Plese fill full the form', 400))
  }
  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    return next(new Errorhandler('Invalid Email Or Password', 401))
  }
  const isPasswordMetched = await user.comparePassword(password)
  if (!isPasswordMetched) {
    return next(new Errorhandler('Invalid Password', 401))
  }
  if (role !== user.role) {
    return next(new Errorhandler('User is not allowed with this role', 401))
  }
//   sendToken(user, 200, res, 'User Loged in successfully')

const token = await user.getJWTToken()
const options ={
    expires: new Date(
        Date.now() + 5+ 24 * 60 * 60 *1000
    ),
    httpOnly:true,
};
res.status(200).cookie('token',token,options).json({
    success:true,
    message:"Login Successfully...",
    token,
    user,
})


})


// logout  user
export const logout = catchAsyncError(async(req,res,next)=>{
    const user = req.user
    // console.log(user)
    res
    .status(201)
    .cookie('token','',{
        httpOnly: true,
        expires: new Date(Date.now())
    })
    .json({
        success:true,
        message:"User logout Successfully...",
        // user
    })
})

export const allStudent = catchAsyncError(async(req,res,next)=>{
    // const userRole = req.user.role;
    // // console.log(userRole)
    // if(userRole == "Student"){
    //     return next(new Errorhandler("Student not allowd to see all students...",400))
    // }
    const students = await User.find({role:'Student'})
    res.status(200).json({
        success:true,
        students
    })
})

export const userDetail = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params;
    const user = await User.findById(id)
    if(!user){
     return next(new Errorhandler("User not exist..."))
    }
    res.status(200).json({
     success:true,
     user
    })
 })
 
//  login user Detail
export const loginUserDetail = catchAsyncError(async(req,res,next)=>{
  const {id} = req.user;
    const user = await User.findById(id)
    if(!user){
     return next(new Errorhandler("Principle not exist..."))
    }
    res.status(200).json({
     success:true,
     user
    })
})


//  update a student
export const updateUser = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params;
    const {role} = req.user;

    if(role !== 'Principle'){
        return next(new Errorhandler("Student and Teacher not Allowed to modify user's deatils",400))
    }
    let user = await User.findById(id)
    if(!user){
        return next(new Errorhandler("User not exist..."))
    }
    user = await User.findByIdAndUpdate(id,req.body,{new:true,useFindAndModify:false})
    res.status(201).json({
        success:true,
        message:"Student Detail Updated Successfully...",
        user
    })
})


export const deleteuser = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params;
    const {role} = req.user;

    if(role !== 'Principle'){
        return next(new Errorhandler("Student and Teacher not Allowed to Delete user's deatils",400))
    }
    let user = await User.findById(id)
    if(!user){
        return next(new Errorhandler("User not exist..."))
    }
    user = await User.findByIdAndDelete(id)
    res.status(201).json({
        success:true,
        message:"Student deleted Successfully...",
    })
})





