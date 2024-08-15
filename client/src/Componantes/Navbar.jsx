import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../main'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { isAuthorized, setIsAuthorized, user } = useContext(Context)
  const navigate = useNavigate()
  // console.log(user)
  const handelLogout = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/api/v1/logout', {
        withCredentials: true,
      })
      toast.success(data.message)
      navigate('/login')
      setIsAuthorized(false)
    } catch (error) {
      console.log('Navbar', error)
      setIsAuthorized(true)
    }
  }

  return (
    <div className="navbar bg-base-200 px-5">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to={'/all/students'}>All Student</Link>
              {user && user.role !== 'Student' ? (
                <ul className="p-2">
                  <li>
                    <Link to={'/add/student'}>Add Student </Link>
                  </li>
                </ul>
              ) : (
                ''
              )}
            </li>
            <li>
              <Link className="" to={'/all/teacher'}>
                All Teacher
              </Link>
              {user && user.role === 'Principle' ? (
                <ul className="p-2">
                  <li>
                    <Link to={'/add/teacher'}>Add Teacher</Link>
                  </li>
                </ul>
              ) : (
                ''
              )}
            </li>
            {user && user.role === 'Principle' ? (
              ''
            ) : (
              <li>
                <Link to={'/principledetail'}>Principle Detail</Link>
              </li>
            )}
            <li>
              <Link to={'/loginuser'}>Your Profile</Link>
            </li>
            {user && user.role === 'Principle' ? (
              <li>
                <Link to={'/allfeedback'}>Feedback's</Link>
              </li>
            ) : (
              ''
            )}
          </ul>
        </div>
        <Link to={'/'} className="text-xl font-bold text-yellow-800 hover:text-yellow-500">
          School
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to={'/loginuser'} className="font-bold text-green-700">
              Your Profile
            </Link>
          </li>
          {user && user.role === 'Principle' ? (
            <li>
              <Link className='font-bold text-yellow-600' to={'/allfeedback'}>Feedback's</Link>
            </li>
          ) : (
            ''
          )}
          <li className="relative group">
            <button className="inline-flex items-center font-bold">
              Student
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>

            <ul className="absolute hidden group-hover:block bg-white shadow-lg rounded-lg mt-1 p-2 z-20">
              <li>
                <Link
                  to={'/all/students'}
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  All Student
                </Link>
              </li>
              {user && user.role !== 'Student' ? (
                <ul className="p-2">
                  <li>
                    <Link to={'/add/student'}>Add Student </Link>
                  </li>
                </ul>
              ) : (
                ''
              )}
            </ul>
          </li>

          <li className="relative group">
            <button className="inline-flex items-center font-bold">
              Teacher
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>

            <ul className="absolute hidden group-hover:block bg-white shadow-lg rounded-lg mt-1 p-2 z-20">
              <li>
                <Link
                  to={'/all/teacher'}
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  All Teacher
                </Link>
              </li>
              {user && user.role === 'Principle' ? (
                <ul className="p-2">
                  <li>
                    <Link to={'/add/teacher'}>Add Teacher</Link>
                  </li>
                </ul>
              ) : (
                ''
              )}
            </ul>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        {isAuthorized ? (
          <button
            className="btn border-solid border-4 border-red-700 bg-red-300 font-bold"
            onClick={handelLogout}
          >
            Logout
          </button>
        ) : (
          <Link
            className="btn border-4  border-green-700 bg-green-300 px-7 font-bold"
            to={'/login'}
          >
            Login
          </Link>
        )}
      </div>
    </div>
  )
}

export default Navbar
