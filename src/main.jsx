import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ChatProvider } from './context/ChatContext.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <AuthProvider>
      <ChatProvider>
        <BrowserRouter>
          <SkeletonTheme baseColor="#ebebeb " highlightColor="#f5f5f5">
            <App />
          </SkeletonTheme>
        </BrowserRouter>
      </ChatProvider>
    </AuthProvider>

    <ToastContainer
      className="toast-position"
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    // theme="dark"
    />
  </>
  ,

)
