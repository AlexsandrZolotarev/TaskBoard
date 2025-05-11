import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import { PrivateRoute } from "./PrivateRoute";
import {MainLayout} from "../layouts/MainLayout";
import { AuthLayout } from "../layouts/AuthLayout";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Profile } from "../pages/Profile";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute />,
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
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register/> },
    ],
  }
])