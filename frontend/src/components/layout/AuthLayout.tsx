import { Outlet, Navigate } from 'react-router-dom';
import Navbar from '../ui/Navbar';
import useAuthContext from '../../hooks/useAuthContext';

export default function AuthLayout() {
  const { loading, user } = useAuthContext();

  if (!loading && !user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col h-screen bg-slate-100">
      <Navbar />
      <div className="h-full py-10">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
