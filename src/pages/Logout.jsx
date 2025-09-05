import React from 'react'

function Logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  return (
    <div>
      
    </div>
  )
}

export default Logout
