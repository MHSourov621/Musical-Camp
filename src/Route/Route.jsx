import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Classes from "../Pages/Classes/Classes";
import Dashboard from "../Layout/Dashboard";
import SelectedClasses from "../Pages/SelectedClasses/SelectedClasses";
import AllUsers from "../Pages/AllUsers/AllUsers";
import PrivateRoute from "./PrivateRoute";
import Instructors from "../Pages/Instructors/Instructors";
import Payment from "../Pages/Payment/Payment";
import EnrollClass from "../Pages/EnrollClass/EnrollClass";
import PaymentHistory from "../Pages/PaymentHistory/PaymentHistory";
import AdminRoute from "./AdminRoute";
import AddClass from "../Pages/AddClass/AddClass";
import MyClasses from "../Pages/MyClasses/MyClasses";
import ManageClass from "../Pages/ManageClass/ManageClass";
import Error from "../Pages/Error/Error";
import InstructorRout from "./InstructorRout";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <Error></Error>,
      children: [
        {
          path: '/',
          element: <Home></Home>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/register',
          element: <Register></Register>
        },
        {
          path: '/classes',
          element: <Classes></Classes>
        },
        {
          path: '/instructors',
          element: <Instructors></Instructors>
        },
      ]
    },
    {
      path: '/dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
        {
          path: 'selectedClasses',
          element: <SelectedClasses></SelectedClasses>
        },
        {
          path: 'enrollClass',
          element: <EnrollClass></EnrollClass>
        },
        {
          path: 'allUsers',
          element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
        },
        {
          path: 'manageClasses',
          element: <AdminRoute><ManageClass></ManageClass></AdminRoute>
        },
        
        {
          path: 'payment/:id',
          element: <Payment></Payment>
        },
        {
          path: 'paymentHistory',
          element: <PaymentHistory></PaymentHistory>
        },
        {
          path: 'addClass',
          element: <InstructorRout><AddClass></AddClass></InstructorRout>
        },
        {
          path: 'myClasses',
          element: <InstructorRout><MyClasses></MyClasses></InstructorRout>
        },
      ] 
    }
  ]);