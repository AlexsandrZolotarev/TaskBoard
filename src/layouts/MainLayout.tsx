import { Outlet, Link } from "react-router-dom"

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 flex justify-between">
        <h1 className="font-bold">TaskBoard</h1>
        <nav className="flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
        </nav>
      </header>

      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>

      <footer className="bg-blue-600 text-white p-4 text-center">
        © 2025
      </footer>
    </div>
  )
}
