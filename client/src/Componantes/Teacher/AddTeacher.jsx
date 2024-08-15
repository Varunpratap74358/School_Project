import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';
import { Context } from '../../main';

const AddTeacher = ({user}) => {
  const {isAuthorized} = useContext(Context)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    imgSrc: '',
    address: '',
    phone: '',
    teacherSalary: '',
    teacherSubject: [{ subName: '' }, { subName: '' }],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubjectChange = (index, value) => {
    const newSubjects = [...formData.teacherSubject];
    newSubjects[index].subName = value;
    setFormData({ ...formData, teacherSubject: newSubjects });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Form data submitted:', formData);
      const { data } = await axios.post(
        'http://localhost:3000/api/v1/teacher/register',
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      // console.log(data);
      toast.success(data.message);
      navigate('/all/teacher');
    } catch (error) {
      // console.log(error);
      toast.error(error.response?.data?.message);
    }
  };


  if(!isAuthorized){
    return <Navigate to={'/'} />
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Teacher Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter name"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="password">Password</label>
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
          <label className="block text-gray-700 font-medium mb-2" htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter age"
          />
        </div>

        {/* ImgSrc */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="imgSrc">Image URL</label>
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
          <label className="block text-gray-700 font-medium mb-2" htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter address"
          ></textarea>
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">Phone</label>
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

        {/* Teacher Salary */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="teacherSalary">Teacher Salary</label>
          <input
            type="number"
            id="teacherSalary"
            name="teacherSalary"
            value={formData.teacherSalary}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter teacher salary"
          />
        </div>

        {/* Teacher Subjects */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Subjects</label>
          {formData.teacherSubject.map((subject, index) => (
            <input
              key={index}
              type="text"
              value={subject.subName}
              onChange={(e) => handleSubjectChange(index, e.target.value)}
              className="w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Subject ${index + 1}`}
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default AddTeacher;
