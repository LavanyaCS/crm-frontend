import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { baseUrl } from '../api';
import { Eye, EyeOff } from 'lucide-react';

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: ""
  });
  const navigate = useNavigate();const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const [showPassword, setShowpassword] = useState(false);
  const [error, setError] = useState('');
  const handleTogglePasswordVisibility = (e) => {
    setShowpassword(!showPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      setLoading(true);
      const res = await axios.post(`${baseUrl}/api/auth/register`, form);
localStorage.setItem("token", res.data.token);
localStorage.setItem("userId", res.data.userInfo._id);
navigate("/");
    }
    catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message); // Backend error message
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
    setLoading(false);
  }
  }
  return (
    <div>
      <div className="flex flex-col items-center justify-center w-full h-screen px-4 text-center bg-center bg-cover bg-image">
        <div className='w-1/2 max-w-2xl px-6 py-4 border rounded-lg xl:w-1/3 backdrop-blur-md bg-white/80 border-gray-500/30'>
          <form onSubmit={handleSubmit} className='space-y-4 w-full'>
            <h1 className='text-2xl font-bold text-center text-gray-900'>Sign Up</h1>
            <label htmlFor="username" className="block mb-1 text-sm font-medium text-left text-black">UserName</label>
            <input type="text" onChange={handleChange} name="username" placeholder="User Name"
              className="w-full px-4 py-2 border rounded" />
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-left text-black">Email Address</label>
            <input type="email" onChange={handleChange} name="email" placeholder="Email"
              className="w-full px-4 py-2 border rounded" />
            <div className="relative">
              <label htmlFor="password" className="block mb-1 text-sm font-medium text-left text-black">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password" name="password"
                className="w-full px-4 py-2 border rounded"
                onChange={handleChange}
                required
              />
              <span onClick={handleTogglePasswordVisibility} className="absolute top-1/2 right-3">
                {showPassword ? (<EyeOff />) : (<Eye />)}
              </span>
            </div>
            <label htmlFor="role" className="block mb-1 text-sm font-medium text-left text-black">Role</label>
            <select onChange={handleChange} name="role" className="w-full px-4 py-2 border rounded">
              <option value="" >---Select a Role---</option>
              <option value="admin" >Admin</option>
              <option value="manager" >Manager</option>
              <option value="user" >User</option>
            </select>

            {error && <p className='text-red-500 text-sm font-semibold'>{error}</p>}

            <button className="w-full py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-800">
              Register
            </button>
            <p className="text-sm text-center text-black">
              Already have an account?{' '}
              <Link to="/" className="font-semibold hover:underline">
                Sign In
              </Link>
            </p>

          </form>
        </div></div>
    </div>
  )
}

export default Register
