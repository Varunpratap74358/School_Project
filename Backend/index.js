import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import {errorMiddleware} from './middleware/error.js'
import studentRouter from './route/studentRoute.js'


const app = express()

dotenv.config()
const port  = process.env.PORT


app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use(cors({
    origin:true,
    method:['GET','PUT','POST','DELETE'],
    credentials:true
}))


app.use('/api/v1',studentRouter)


mongoose.connect(process.env.MONGOURL)
.then(()=>{
    console.log("Db is connected")
})
.catch((err)=>{
    console.log("Db is not connected",err)
})



app.use(errorMiddleware)
app.listen(port,()=>{
    console.log(`Port is running on ${port}`)
})