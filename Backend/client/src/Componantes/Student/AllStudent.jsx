import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { Context } from '../../main'

const AllStudent = () => {
  const [students, setStudents] = useState([])
  const {user} = useContext(Context)
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:3000/api/v1/student/allstudent',
          {
            withCredentials: true,
          },
        )
        setStudents(data.students)
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
    <div className="p-5 md:p-2">
      {students.length < 0 ? (
        <div className="mt-[-50px]">
          <h1 className="text-center text-blue-400 text-5xl mt-20 font-bold">
            Students Not Found
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
          {students.map((v, i) => {
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
                  <p>Class: <span className='font-bold'>{v.NameClass}</span></p>
                  <div className="card-actions justify-end">
                   {
                    user && user.role==='Student'? "" : (
                      <Link to={`/userdetail/${v._id}`} className="btn bg-green-500 ">Student Detail</Link>
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

export default AllStudent
