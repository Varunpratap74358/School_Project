import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const AllFeedBack = () => {
  const { isAuthorized, user } = useContext(Context)
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchFeedback = async () => {
      const { data } = await axios.get(
        'http://localhost:3000/api/v1/feedback/allfeedback',
        {
          withCredentials: true,
        },
      )
      //   console.log(data)
      setData(data.feedback)
    }
    fetchFeedback()
  }, [])

  const deleteMessage = async (id) => {
    const {
      data,
    } = await axios.delete(
      `http://localhost:3000/api/v1/feedback/delete/${id}`,
      { withCredentials: true },
    )
    toast.success(data.message)
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  // if(user.role!=='Principle'){
  //     return <Navigate to={'/'} />
  // }
  return (
    <div className="items-center min-h-screen bg-gradient-to-tr from-green-500 to-yellow-500 p-5">
      {data.length > 0 ? (
        data.map((v, i) => {
          return (
            <div key={i}>
              <div className="feedback m-2 p-5 border-solid border-4 border-red-400 rounded-lg mt-2 bg-white">
                <h3>
                  Name:{' '}
                  <span className="text-green-700 font-bold">{v.name} </span>
                </h3>
                <h3>
                  Email:{' '}
                  <span className="text-green-700 font-bold"> {v.email}</span>
                </h3>
                <h3>
                  Phone:{' '}
                  <span className="text-green-700 font-bold">{v.phone} </span>
                </h3>
                <p>
                  Message: <span className="text-green-700 ">{v.message} </span>
                </p>
                <div className="flex justify-end mt-2">
                  <button
                    className="bg-red-500 px-5 py-2 rounded hover:bg-red-400 "
                    onClick={() => deleteMessage(v._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )
        })
      ) : (
        <h1 className="text-center text-3xl font-bold underline mt-10">
          FeedBack Not Exist
        </h1>
      )}
    </div>
  )
}

export default AllFeedBack


