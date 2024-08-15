import React, { useContext } from 'react'
import { Context } from '../main'
import { Navigate } from 'react-router-dom'

const LoginUserDetail = () => {
  const { isAuthorized, user } = useContext(Context)
//   console.log(user)

    if(!isAuthorized){
        return <Navigate to={'/'} />
    }

  return (
    <div className="flex  justify-center items-center min-h-screen bg-gradient-to-r from-green-500 to-yellow-500 p-5">
      <div className="container max-w-lg bg-white shadow-xl rounded-3xl overflow-hidden">
        <div className="flex flex-col items-center">
          <div className="w-45 h-40 mt-10 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
            <img
              src={user.imgSrc}
              alt="User Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center p-6 space-y-4">
            <h3 className="text-2xl font-semibold text-gray-800">
              Name: <span className="text-blue-500">{user.name}</span>
            </h3>
            <p className="text-lg text-gray-600">Age: <span className='font-bold'>{user.age}</span></p>
            <p className="text-lg text-gray-600">Email: <span className='font-bold'>{user.email}</span></p>
            <p className="text-lg text-gray-600">Phone: <span className='font-bold'>{user.phone}</span></p>

            {user?.role === 'Student' && (
              <>
                <p className="text-lg text-gray-600">Class: {user.NameClass}</p>
                <p className="text-lg text-gray-600">
                  Due Fees: {user.stuFees}
                </p>
                <p className="text-lg text-gray-600">
                  Paid Fees: {user.stuPayedFees}
                </p>
                <p className="text-lg text-gray-600">
                  Subjects:{' '}
                  {user.subjects.map((v, i) => (
                    <span
                      key={i}
                      className="inline-block bg-blue-200 text-blue-700 px-2 py-1 rounded-full mr-2 text-sm mt-1"
                    >
                      {v.subName}
                    </span>
                  ))}
                </p>
              </>
            )}

            {user?.role === 'Teacher' && (
              <p className="text-lg text-gray-600">
                Subjects:{' '}
                {user.teacherSubject.map((v, i) => (
                  <span
                    key={i}
                    className="inline-block bg-green-200 text-green-700 px-2 py-1 rounded-full mr-2 text-sm mt-1"
                  >
                    {v.subName}
                  </span>
                ))}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginUserDetail
