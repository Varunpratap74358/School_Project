import React, { useContext, useState } from 'react'
import { Context } from '../main'
import { Navigate, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'

const Login = () => {
  const [email, setemail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const { isAuthorized, setIsAuthorized } = useContext(Context)
  const navigate = useNavigate()

  const handelLogin = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(
        'http://localhost:3000/api/v1/login',
        { email, password, role },
        {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
        },
      )
      // console.log(data)
      toast.success(data.message)
      setIsAuthorized(true)
      navigate('/')
    } catch (error) {
      toast.error(error.response?.data?.message)

      // console.log(email,password,role)
      // console.log('Error in Login Componante', error)
    }
  }

  if (isAuthorized) {
    return <Navigate to={'/'} />
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Login to Your Account
        </h2>

        <form className="space-y-6" onSubmit={handelLogin}>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="role" className="text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            >
              <option value="">Select Role</option>
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
              <option value="Principle">Principle</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
