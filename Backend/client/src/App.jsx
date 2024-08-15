import React, { useContext, useEffect, useState } from 'react'
import {Context} from './main'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Componantes/Home'
import Footer from './Componantes/Footer'
import Navbar from './Componantes/Navbar'
import AddStudent from './Componantes/Student/AddStudent'
import AllStudent from './Componantes/Student/AllStudent'
import UpdateStudent from './Componantes/Student/UpdateStudent'
import AddTeacher from './Componantes/Teacher/AddTeacher'
import AllTeacher from './Componantes/Teacher/AllTeacher'
import UpdateTeacher from './Componantes/Teacher/UpdateTeacher'
import UserDetail from './Componantes/UserDetail'
import Login from './Componantes/Login'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import TeacherDetail from './Componantes/Teacher/TeacherDetail'
import PrincipleDetail from './Componantes/Teacher/PrincipleDetail'
import UpdatePrinciple from './Componantes/Teacher/UpdatePrinciple'
import LoginUserDetail from './Componantes/LoginUserDetail'
import AllFeedBack from './Componantes/AllFeedBack'

const App = () => {
  const {isAuthorized,setIsAuthorized,setUser} = useContext(Context)
  const [info,setInfo] = useState({})
  useEffect(()=>{
    const fetchUser = async()=>{
      try {
        const {data} = await axios.get("http://localhost:3000/api/v1/login/userdetail",{withCredentials:true})
        setUser(data.user)
        // console.log(data)
        setInfo(data.user)
        setIsAuthorized(true)
      } catch (error) {
        // console.log("Error in App componante",error)
        toast.error(error.response?.data?.message)
        setIsAuthorized(false)
      }
    }
    fetchUser()
  },[isAuthorized])
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/loginuser' element={<LoginUserDetail />} />
          <Route path='/add/student' element={<AddStudent user={info} />}  />
          <Route path='/all/students' element={<AllStudent />} />
          <Route path='/userdetail/:id' element={<UserDetail />} />
          <Route path='/updatestudent/:id' element={<UpdateStudent user={info} />} />
          <Route path='/all/teacher' element={<AllTeacher />} />
          <Route path='/teacherdetail/:id' element={<TeacherDetail />} />
          <Route path='/add/teacher' element={<AddTeacher user={info}  />} />
          <Route path='/updateteacher/:id' element={<UpdateTeacher />} />
          <Route path='/principledetail' element={<PrincipleDetail />} />
          <Route path='/updateprinciple/:id' element={<UpdatePrinciple />} />
          <Route path='/allfeedback' element={<AllFeedBack />} />
        </Routes>
        <Toaster />
      </Router>
    </>
  )
}

export default App
