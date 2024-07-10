import { useState } from 'react'
import './App.css'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import { useAuth } from './context/AuthContext'
import { Outlet } from 'react-router-dom'


const PublicRoute = () => {

  const { isUserLoggedIn } = useAuth()

  if (isUserLoggedIn) {
    return <Navigate to='/chats' />
  }
  return <Outlet />

};

const ProtectedRoute = () => {

  const { isUserLoggedIn } = useAuth()
  const location = useLocation();

  if (!isUserLoggedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return <Outlet />;

};

function App() {

  return (
    <div className='w-screen h-screen bg-blue-300 overflow-hidden'>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path='/' element={<HomePage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path='/chats' element={<ChatPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
