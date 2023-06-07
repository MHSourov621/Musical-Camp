import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Route/Route.jsx';
import AuthProvider from './Provider/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='bg-blue-950  text-white'>
      <div className='max-w-[1600px] mx-auto font-raleway'>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </div>
    </div>
  </React.StrictMode>,
)
