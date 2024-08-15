import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const SubjectSchema = new mongoose.Schema({
    subName: {
      type: String,
      required: function() { return this.role === 'Student'; },
    }
  });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Pliese fill your Name'],
  },
  email: {
    type: String,
    require: [true, 'Pliese fill your email'],
  },
  password: {
    type: String,
    require: [true, 'Pliese your password'],
    select:false
  },
  age:{
    type: Number,
    require: [true, 'Pliese your age'],
  },
  NameClass:{
    type:String
  },
  subjects: [SubjectSchema],
  imgSrc:{
    type:String,
    require: [true, 'Pliese your img url'],
  },
  address:{
    type:String,
    require: [true, 'Pliese your img url'],
  },
  phone:{
    type: Number,
    require: [true, 'Pliese your phone'],
  },
  stuFees:{
    type:Number,
    default:5000,
    required: function() { return this.role === 'Student'; },
  },
  stuPayedFees:{
    type:Number,
    default:0,
    required: function() { return this.role === 'Student'; },
  },
  teacherSalary:{
    type:Number,
    required: function() { return this.role === 'Teacher'; },
  },
  teacherSubject:{
    type:[SubjectSchema],
    required: function() { return this.role === 'Teacher'; },
  },
  role:{
    type: String,
    require: [true,'pliese provide your Role'],
    enum: ['Student', 'Teacher','Principle'],
  }

},{timestamps:true})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.getJWTToken = async function () {
  return await jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}


export const User = mongoose.model("User",userSchema)