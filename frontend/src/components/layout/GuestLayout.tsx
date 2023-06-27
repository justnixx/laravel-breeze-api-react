import { Outlet, Navigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

export default function GuestLayout() {
  const { user } = useAuthContext()

  return !user ? <Outlet /> : <Navigate to={'/'} />
}
