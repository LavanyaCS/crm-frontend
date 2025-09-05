import React, { useEffect,useState } from 'react'
import Dashboard from './Dashboard'
import Home from './Home'
import Customer from './Customer'
import Case from './Case'
import { Link, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

function Header() {
  const navigate = useNavigate();
  const [isAdmin,setAdmin] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  }
  useEffect(() => {
    try{
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  setAdmin(decode.role === 'admin');

    }
    catch (err) {
      console.error("No User", err);
    }

  })
  return (
    <div>
     <div className="flex justify-between gap-4 items-center text-white bg-slate-900 p-4">
     <div className="text-xl font-bold">
          CRM Application
        </div>
<div className="flex gap-4 gap-x-6">
  {isAdmin && (<Link to="/dashboard" className='cursor-pointer' element={<Dashboard />}>Dashboard</Link>
)}
{!isAdmin &&(<Link to="/home" className='cursor-pointer' element={<Home />}>Home</Link>

  )
  }      
    <Link to="/customer" className='cursor-pointer' element={<Customer />}>Customer</Link>
    <Link to="/case" className='cursor-pointer' element={<Case />}>Case</Link>
    <p className='cursor-pointer' onClick={handleLogout}>Logout</p>
</div>
</div> 
    </div>
  )
}

export default Header
