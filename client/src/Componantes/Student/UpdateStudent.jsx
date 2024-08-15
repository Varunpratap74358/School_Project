import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../main'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'

const UpdateStudent = () => {
  const { isAuthorized } = useContext(Context)
  const [data, setData] = useState({})
  const navigate = useNavigate()
  const { id } = useParams()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    imgSrc: '',
    address: '',
    phone: '',
    NameClass: '',
    stuFees: '',
    stuPayedFees: '',
    subjects: ['', '', '', '', ''],
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/v1/userdetail/${id}`,
          {
            withCredentials: true,
          }
        )
        const user = data.user
        setData(user)

        // Populate formData with the fetched data
        setFormData({
          name: user.name || '',
          email: user.email || '',
          password: '', // Intentionally left blank for security reasons
          age: user.age || '',
          imgSrc: user.imgSrc || '',
          address: user.address || '',
          phone: user.phone || '',
          NameClass: user.NameClass || '',
          stuFees: user.stuFees || '',
          stuPayedFees: user.stuPayedFees || '',
          subjects: user.subjects.map(sub => sub.subName) || ['', '', '', '', ''],
        })
      } catch (error) {
        toast.error(error.response?.data?.message)
      }
    }
    fetchData()
  }, [id])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubjectChange = (index, value) => {
    const newSubjects = [...formData.subjects]
    newSubjects[index] = value
    setFormData({ ...formData, subjects: newSubjects })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Convert subjects array of strings to array of objects
    const formattedSubjects = formData.subjects.map((subject) => ({
      subName: subject,
    }))

    const submitData = {
      ...formData,
      subjects: formattedSubjects,
    }

    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/v1/update/${id}`,
        submitData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      toast.success(data.message)
      navigate(`/userdetail/${id}`)
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }
  if(!isAuthorized){
    return <Navigate to={"/"} />
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Update Student
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter student name"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter student email"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter password"
          />
        </div>

        {/* Age */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="age">
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter student age"
          />
        </div>

        {/* ImgSrc */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="imgSrc"
          >
            Image URL
          </label>
          <input
            type="text"
            id="imgSrc"
            name="imgSrc"
            value={formData.imgSrc}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter image URL"
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="address"
          >
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter student address"
          ></textarea>
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="phone"
          >
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter phone number"
          />
        </div>

        {/* NameClass */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="NameClass"
          >
            Class
          </label>
          <select
            value={formData.NameClass}
            name="NameClass"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Class</option>
            <option value="11th">11th</option>
            <option value="12th">12th</option>
          </select>
        </div>

        {/* Student Fees */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="stuFees"
          >
            Student Fees
          </label>
          <input
            type="number"
            id="stuFees"
            name="stuFees"
            value={formData.stuFees}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter student fees"
          />
        </div>

        {/* Student Paid Fees */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="stuPayedFees"
          >
            Student Paid Fees
          </label>
          <input
            type="number"
            id="stuPayedFees"
            name="stuPayedFees"
            value={formData.stuPayedFees}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter student paid fees"
          />
        </div>

        {/* Subjects */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Subjects
          </label>
          {formData.subjects.map((subject, index) => (
            <input
              key={index}
              type="text"
              value={subject}
              onChange={(e) => handleSubjectChange(index, e.target.value)}
              className="w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Subject ${index + 1}`}
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition duration-300"
        >
          Update
        </button>
      </form>
    </div>
  )
}

export default UpdateStudent
