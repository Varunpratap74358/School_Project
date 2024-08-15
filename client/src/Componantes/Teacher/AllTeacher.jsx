import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, Navigate } from 'react-router-dom'
import { Context } from '../../main'

const AllTeacher = () => {
  const {isAuthorized} = useContext(Context)
  const [teachers, setTeachers] = useState([])
  const {user} = useContext(Context)


  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:3000/api/v1/teacher/allteacher',
          {
            withCredentials: true,
          },
        )
        setTeachers(data.students)
        // console.log(data)
      } catch (error) {
        // console.log(error)
        toast.error(error.response?.data?.message)
      }
    }
    fetchStudent()
  }, [])
  // console.log(students)



  



  return (
    <div className="p-5">
      {teachers.length < 0 ? (
        <div className="mt-[-50px]">
          <h1 className="text-center text-blue-400 text-5xl mt-20 font-bold">
            Teachers Not Found
          </h1>
          <div className=" max-w-[100%] mt-[10px] flex justify-center">
            <img
              width={1000}
              src="https://png.pngtree.com/png-vector/20200313/ourmid/pngtree-page-not-found-error-404-concept-with-people-trying-to-fix-png-image_2157908.jpg"
              alt="students"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {teachers.map((v, i) => {
            return (
              <div
                key={i}
                className="card m-2 card-compact bg-base-100 md:w-96 shadow-xl border-solid border-4 border-sky-200"
              >
                <figure>
                  <img src={v.imgSrc} alt="studentimg" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{v.name}</h2>
                  
                  <div className="card-actions justify-end">
                   {
                    user && user.role==='Student'? "" : (
                      <Link to={`/teacherdetail/${v._id}`} className="btn bg-pink-500 ">Teacher Detail</Link>
                    )
                   }
                    
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default AllTeacher
