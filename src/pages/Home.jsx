import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { baseUrl } from '../api';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Home() {
    const [username,setUsername] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token){
            navigate("/");return;
        }
        try{
        const decoded = jwtDecode(token);
        console.log(decoded);
        setUsername(decoded.username);
        }
        catch(err){
            console.error(err);
            navigate("/");
        }
    },[navigate]);
  return (
    <div>
        <div className="text-2xl w-full flex justify-center items-center ">
    {username ? `Welcome ${username} to CRM Application!!`:'Welcome Guest to CRM Application!!'} 
    {/* Welcome Guest to CRM Applications!! */}
      </div>

    </div>
  )
}

export default Home
