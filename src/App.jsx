import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Customer from './pages/Customer'
import Case from './pages/Case'
import ProtectedRoute from './components/ProtectedRoute'
import Header from './pages/Header'
import Footer from './pages/Footer'
import Home from './pages/Home'

function App() {
  const token = localStorage.getItem("token");
  return (
    <div className="h-screen w-full flex flex-col">
      
      {/* Header */}
      {token && <Header />}

      {/* Main content */}
      <div className="flex-1 overflow-y-auto w-full">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div className="p-4">
                  <Dashboard />
                </div>
              </ProtectedRoute>
            }
          />
           <Route
            path="/home"
            element={
              <ProtectedRoute>
                <div className="p-4">
                  <Home />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer"
            element={
              <ProtectedRoute>
                <div className="p-4">
                  <Customer />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/case"
            element={
              <ProtectedRoute>
                <div className="p-4">
                  <Case />
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      {/* Footer */}
      {token && <Footer />}
    </div>
  )
}

export default App
