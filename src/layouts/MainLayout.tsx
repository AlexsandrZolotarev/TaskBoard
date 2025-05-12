import { Outlet, Link, useNavigate } from "react-router-dom";
import { logout } from "../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";

export const MainLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username } = useSelector((state: RootState) => state.auth);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="font-bold text-lg">TaskBoard</h1>

        <nav className="flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
        </nav>

        <div className="flex items-center gap-3">
          <img
            src={`https://ui-avatars.com/api/?name=${username}`}
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="text-sm">Добро пожаловать,</p>
            <p className="font-bold">{username}</p>
          </div>
          <button
            onClick={handleLogout}
            className="ml-2 text-sm underline hover:text-gray-200"
          >
            Выйти
          </button>
        </div>
      </header>

      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>

      <footer className="bg-blue-600 text-white p-4 text-center">© 2025</footer>
    </div>
  );
};
