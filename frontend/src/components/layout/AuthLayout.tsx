import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../ui/Navbar";
import useAuthContext from "../../hooks/useAuthContext";

export default function AuthLayout() {
  const { user } = useAuthContext()

  return user ?
    (
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="h-full py-10">
          <div className="container mx-auto px-4">
            < Outlet />
          </div>
        </div>
      </div>
    ) :
    <Navigate to={'/login'} />
}
