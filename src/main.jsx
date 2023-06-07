import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Route/Route.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='bg-blue-950  text-white'>
      <div className='max-w-[1600px] mx-auto font-raleway'>
        <RouterProvider router={router} />
      </div>
    </div>
  </React.StrictMode>,
)
