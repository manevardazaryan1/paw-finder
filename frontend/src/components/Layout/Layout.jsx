import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import useLayout from '../../hooks/useLayout'
import logo from '../../assets/images/logo/logo.png'

const Layout = () => {
  const { isAuth, handleSignOut } = useAuth()
  const { menuOpen, toggleMenu } = useLayout()

  return (
    <div>
      <nav className="bg-black text-white shadow-md border-b border-gray-700">
        <div className="max-w-[1200px] w-full mx-auto flex items-center p-3 h-[80px]">
          <div className="flex justify-between w-[180px] items-center">
            <Link to="/" className="flex items-center h-16 w-full justify-between">
              <img src={logo} alt="Paw Finder" className="w-auto h-full" />
              <h3 className="ml-2">Paw-Finder</h3>
            </Link>
          </div>
          <div className="ml-auto">
            <button className="md:hidden" onClick={toggleMenu}>
              ☰
            </button>
          </div>
          <div className="hidden md:flex flex-1 pl-3 justify-between">
            <div className="space-x-4">
              {isAuth && <Link to="/reports">Reports</Link>}
              {isAuth && <Link to="/create-report">Create Report</Link>}
            </div>
            <div className="space-x-4">
              {isAuth && <button onClick={handleSignOut}>Sign Out</button>}
              {!isAuth && <Link to="/sign-up">Sign Up</Link>}
              {!isAuth && <Link to="/sign-in">Sign In</Link>}
            </div>
          </div>
        </div>
        {menuOpen && (
          <div className="absolute top-[79px] right-0 bg-black text-white w-full shadow-md flex flex-col space-y-2 p-4 items-center">
            {!isAuth && <Link to="/">Home</Link>}
            {isAuth && <Link to="/reports">Reports</Link>}
            {isAuth && <Link to="/create-report">Create Report</Link>}
            {!isAuth && <Link to="/sign-up">Sign Up</Link>}
            {!isAuth && <Link to="/sign-in">Sign In</Link>}
            {isAuth && <button onClick={handleSignOut}>Sign Out</button>}
          </div>
        )}
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
