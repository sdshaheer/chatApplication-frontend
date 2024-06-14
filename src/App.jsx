import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='w-screen h-screen bg-blue-300'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/chats' element={<ChatPage />} />
      </Routes>
    </div>
  )
}

export default App
