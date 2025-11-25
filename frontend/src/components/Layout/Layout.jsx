import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const Layout = () => {
  const { isAuth, user, handleSignOut } = useAuth()

  return (
    <>
      {user && <h1>{user.id}</h1>}
      <div>
        <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
          {!isAuth && <Link to="/">Home</Link>}
          {isAuth && <Link to="/reports">Reports</Link>}
          {isAuth && <Link to="/create-report">Create Report</Link>}
          {isAuth && <button onClick={handleSignOut}>Sign Out</button>}
          {!isAuth && <Link to="/sign-up">Sign Up</Link>}
          {!isAuth && <Link to="/sign-in">Sign In</Link>}
        </nav>
        <main style={{ padding: '1rem' }}>
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default Layout
