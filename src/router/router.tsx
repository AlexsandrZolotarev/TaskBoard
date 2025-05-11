import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import { PrivateRoute } from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      { index: true, element: <Home /> },
    ],
  },
])