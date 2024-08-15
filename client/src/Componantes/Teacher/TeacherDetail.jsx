import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { Context } from '../../main'

const TeacherDetail = () => {
  const { isAuthorized, user } = useContext(Context)
  const [data,setData] = useState({})
  const [teacherSub,setTeacherSub] = useState([])
  const navigate = useNavigate()
  const {id} = useParams()

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/v1/userdetail/${id}`,
          {
            withCredentials: true,
          },
        )
        console.log(data.user)
        setData(data.user)
        setTeacherSub(data.user.teacherSubject)
      } catch (error) {
        // console.log(error)
        toast.error(error.response?.data?.message)
      }
    }
    fetchdata()
  }, [])

  const deleteStudent = async(stuId)=>{
    try {
        const {data} = await axios.delete(`http://localhost:3000/api/v1/delete/${stuId}`,{withCredentials:true})
        toast.success(data.message)
        navigate("/all/teacher")
    } catch (error) {
        toast.error(error.response?.data?.message)
    }
  }
  
  if(!isAuthorized){
    return <Navigate to={"/"} />
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-lg shadow-lg max-w-4xl mx-auto mt-10">
    <div className="info flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
      <div className="text-center md:text-left space-y-4">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">
          Teacher Details
        </h1>
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Name:</span>
          {data.name}
        </p>
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Email:</span> {data.email}
        </p>
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Age:</span> {data.age}
        </p>
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Phone:</span> {data.phone}
        </p>
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Address:</span>{' '}
          {data.address}
        </p>
        <div className="text-lg text-gray-700">
          <span className="font-semibold">Teacher Subjects:</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {teacherSub.map((v, i) => {
              return (
                <span
                  key={i}
                  className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full"
                >
                  {v.subName}
                </span>
              )
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <img
          src={data.imgSrc}
          alt="User"
          className="w-48 h-48 object-cover rounded-full shadow-lg"
        />
        <div className="flex gap-4">
          {user && user.role !== 'Principle' ? (
            ''
          ) : (
            <>
              <button onClick={()=>deleteStudent(data._id)} className="bg-red-500 text-white px-6 py-2 rounded-lg shadow hover:bg-red-600 transition duration-300">
                Delete
              </button>
              <Link to={`/updateteacher/${data._id}`} className="bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 transition duration-300">
                Update
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  </div>
  )
}

export default TeacherDetail
