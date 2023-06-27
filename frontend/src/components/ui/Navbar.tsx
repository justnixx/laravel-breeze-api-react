import { Link } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

export default function Navbar() {
  const { logout, user } = useAuthContext()

  return (
    <div className="bg-white shadow-lg py-4 border-b border-slate-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to={'/'} >
            <h1 className="text-2xl font-bold">Logo</h1>
          </Link>
          <div>
            <span className="text-xs mx-2 text-indigo-500 font-bold">{user?.email}</span>
            <button className="ring-1 ring-red-400 rounded py-1.5 px-3 text-sm text-red-500 hover:bg-red-400 hover:text-white duration-300" onClick={logout} >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
