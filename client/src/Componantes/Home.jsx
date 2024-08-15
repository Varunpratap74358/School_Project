import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'

const Home = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handelsendFeedback = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(
        'http://localhost:3000/api/v1/feedback/send',
        { name, phone, email, message },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      // console.log(data)
      toast.success(data.message)
      setName('')
      setPhone('')
      setEmail('')
      setMessage('')
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-400 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate__animated animate__fadeInDown">
            Welcome to Our School
          </h1>
          <p className="text-lg md:text-xl mb-8 animate__animated animate__fadeInUp">
            Empowering Students for a Bright Future
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 animate__animated animate__fadeInLeft">
            About Our School
          </h2>
          <p className="text-lg text-gray-600 mb-8 animate__animated animate__fadeInRight px-20 py-3 text-start">
            Our school is committed to providing high-quality education and
            fostering an environment of growth and development for our students.{' '}
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur voluptas nemo alias repellat, dolor incidunt temporibus
            blanditiis distinctio, quibusdam ipsam perspiciatis architecto sed
            necessitatibus maxime beatae, quasi culpa illo illum dolorem fugiat
            labore cum officia excepturi. Sapiente omnis tempore voluptatibus id
            nostrum repellendus iure quae nisi, pariatur aspernatur quaerat
            laborum.
          </p>
          <div className="flex justify-center">
            <img
              id="img-move"
              src="https://png.pngtree.com/png-clipart/20230715/ourlarge/pngtree-school-building-vector-images-png-image_7507280.png"
              alt="About Us"
              className="rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/3 animate__animated animate__zoomIn img-move"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-blue-50 py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12 animate__animated animate__fadeIn">
            Our Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 animate__animated animate__flipInX animate__delay-2s text-center">
              <img
                src="https://png.pngtree.com/png-clipart/20230425/original/pngtree-cartoon-three-dimensional-illustration-of-elementary-school-students-png-image_9100561.png"
                className="w-full h-50 object-cover rounded-lg mb-4 mx-auto"
              />
              <Link
                to={'/all/students'}
                className="text-2xl font-semibold text-gray-800 mb-2 text-center"
              >
                Student
              </Link>
              <p className="text-gray-600 text-center">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error
                ipsam perspiciatis dolor beatae maiores consequatur repudiandae
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 animate__animated animate__flipInX animate__delay-2s text-center">
              <img
                src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/07bfb495-d210-43b4-b93d-ecac8b66d2ab/17008cdf-fcf4-4ec8-a1ad-f6c0597f2163.png"
                className="w-full h-50 object-cover rounded-lg mb-4 mx-auto"
              />
              <Link
                to={'/all/teacher'}
                className="text-2xl font-semibold text-gray-800 mb-2 text-center"
              >
                Modern Teachers
              </Link>
              <p className="text-gray-600 text-center">
                Our campus features state-of-the-art facilities and resources.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 animate__animated animate__flipInX animate__delay-2s text-center">
              <img
                src="https://png.pngtree.com/png-clipart/20230916/original/pngtree-cartoon-character-of-an-architect-with-glasses-clipart-vector-png-image_12246133.png"
                className="w-full h-50 object-cover rounded-lg mb-4 mx-auto"
              />
              <Link
                to={'/principledetail'}
                className="text-2xl font-semibold text-gray-800 mb-2 text-center"
              >
                Principle
              </Link>
              <p className="text-gray-600 text-center">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error
                ipsam perspiciatis dolor beatae maiores consequatur repudiandae
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* feed back section */}
      <section className="feedback bg-blue-200 text-center p-7">
        <h3 className="text-blue-700 text-3xl font-bold underline p-4">
          Send Feedback
        </h3>
        <form  onSubmit={handelsendFeedback}>
          <input
            className="w-[500px] px-3 py-2 rounded m-1 text-center"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <br />
          <input
            className="w-[500px] px-3 py-2 rounded m-1 text-center"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <input
            className="w-[500px] px-3 py-2 rounded m-1 text-center"
            type="number"
            placeholder="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <br />
          <textarea
            placeholder="Enter message"
            className="w-[500px] px-3 py-2 rounded m-1 text-center"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />{' '}
          <br />
          <button
            type="submit"
            className=" bg-green-600 hover:bg-green-800 py-2 px-10 rounded-xl font-bold"
          >
            Send
          </button>
        </form>
      </section>
      {/* Footer Section */}
      <footer className="bg-blue-600 text-white py-6 mt-20">
        <div className="container mx-auto text-center">
          <p className="text-lg">
            &copy; 2024 Your School Name. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Home
