import { useSelector } from "react-redux"
import type { RootState } from "../store"
import { Navigate, Outlet } from "react-router-dom"

export const PrivateRoute = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.email !== null
  )

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
