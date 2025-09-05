import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children}) {
    
const token = localStorage.getItem("token");
// console.log("Token in ProtectedRoute:", token);
  return (
    token ? children : <Navigate to="/" />
  )
}

export default ProtectedRoute
