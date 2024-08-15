import express from 'express'
import { allStudent, deleteuser, login, loginUserDetail, logout,  registerStudent, updateUser, userDetail } from '../controller/userController.js'
import {isAuthorized} from '../middleware/auth.js'
import {  allTeachers, principle, registerPrinciple, registerTeacher } from '../controller/teacherControler.js'
import { deleteFeedback, getallFeedback, sendFeedBack } from '../controller/feedbackControler.js'

const router = express.Router()

// student route
router.post('/student/register',isAuthorized,registerStudent)
router.get("/student/allstudent",isAuthorized,allStudent)


// all common route
router.get('/userdetail/:id',isAuthorized,userDetail)/
router.post('/login',login)
router.get('/logout', isAuthorized ,logout)
router.put("/update/:id",isAuthorized,updateUser)
router.delete("/delete/:id",isAuthorized,deleteuser)
router.get('/login/userdetail',isAuthorized,loginUserDetail)


// teacher route
router.post("/teacher/register",isAuthorized ,registerTeacher)
router.get('/teacher/allteacher',allTeachers)


// principle route
router.post('/principle/register',isAuthorized,registerPrinciple)
router.get('/principle/detail',principle)

// feed back route
router.post('/feedback/send',sendFeedBack)
router.get('/feedback/allfeedback',isAuthorized,getallFeedback)
router.delete('/feedback/delete/:id',isAuthorized,deleteFeedback)

export default router