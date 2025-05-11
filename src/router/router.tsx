import { createHashRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import { PrivateRoute } from "./PrivateRoute";
import {MainLayout} from "../layouts/MainLayout";
import { AuthLayout } from "../layouts/AuthLayout";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Profile } from "../pages/Profile";
import { ErrorPage } from "../pages/ErrorPage";

export const router = createHashRouter([
  {
    path: '/',
    element: <PrivateRoute />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '/',
        element : <MainLayout/>,
        children : [{index: true, element:<Home/>},{path: 'profile', element:<Profile/>},]
      }
    ]
  },
  {
    path: '/',
    element:<AuthLayout/>,
     errorElement: <ErrorPage />, 
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register/> },
    ],
  }
])