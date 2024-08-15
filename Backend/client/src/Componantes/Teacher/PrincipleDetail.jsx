import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../main'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Link } from 'react-router-dom'

const PrincipleDetail = () => {
  const { isAuthorized, user } = useContext(Context)
  const [data, setData] = useState({})

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/v1//principle/detail`,
          {
            withCredentials: true,
          },
        )
        // console.log(data.prince[0])
        setData(data.prince[0])
      } catch (error) {
        console.log(error)
        // toast.error(error.response?.data?.message)
      }
    }
    fetchdata()
  }, [])

  
  return (
    <>
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-lg shadow-lg max-w-4xl mx-auto mt-10">
        <div className="info flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          <div className="text-center md:text-left space-y-4">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">
              Principle Details
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
              <span className="font-semibold">Address:</span> {data.address}
            </p>
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
                  <Link
                    to={`/updateprinciple/${data._id}`}
                    className="bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 transition duration-300"
                  >
                    Update
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PrincipleDetail
