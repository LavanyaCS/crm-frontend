import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { baseUrl } from '../api';
import { Eye,EyeOff } from 'lucide-react';
import {jwtDecode} from 'jwt-decode';

function Login() {
    const [form,setForm] = useState({
        // username: "",
        email:"",
        password:""
    });
    const [showPassword,setShowpassword] = useState(false);
    const navigate = useNavigate();
    const [error,setError] = useState('');
    const handleTogglePasswordVisibility = (e) =>{
        setShowpassword(!showPassword)
    }
    const handleChange = (e) => {
        setForm({...form,[e.target.name] : e.target.value});
    }
    const handleSubmit =  async (e) => {
        e.preventDefault();console.log("Form Data:", form);
try{
        const res = await axios.post(`${baseUrl}/api/auth/login`,form);
        localStorage.setItem("token",res.data.token);

        // navigate("/dashboard");
        const decode = jwtDecode(res.data.token);
        if(decode.role === 'admin'){
          navigate("/dashboard")
        }
        else{
          navigate("/home")
        }
}
catch(error){
console.log(error.message);
setError("Invalid Credientials");
}
}
  return (
    <div>
         <div className="flex flex-col items-center justify-center w-full h-screen px-4 text-center bg-center bg-cover bg-image">
            <div className='w-1/2 max-w-2xl px-6 py-4 border rounded-lg xl:w-1/3 backdrop-blur-md bg-white/80 border-gray-500/30'>
<form onSubmit={handleSubmit} className='space-y-4 w-full'>
    <h1 className='text-2xl font-bold text-center text-gray-900'>Sign In</h1>
     <label htmlFor="email" className="block mb-1 text-sm font-medium text-left text-black">Email Address</label>
       <input type="email" onChange={handleChange} name="email" placeholder="Email"
          className="w-full px-4 py-2 border rounded"/>
                  <div className="relative">
          <label htmlFor="password" className="block mb-1 text-sm font-medium text-left text-black">Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password" name ="password"
          className="w-full px-4 py-2 border rounded"
           onChange={handleChange} 
          required
        />
      <span onClick={handleTogglePasswordVisibility} className="absolute top-1/2 right-3">
        {showPassword ? (<EyeOff />) : (<Eye />)}
        </span>
        </div>
        {error && <p className='text-red-500 text-sm font-semibold'>{error}</p>}

  <button  className="w-full py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-800">
          Login
        </button>
         <p className="text-sm text-center text-black">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      
</form>
</div></div>
    </div>
  )
}

export default Login
