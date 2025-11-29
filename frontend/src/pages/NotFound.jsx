import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  useEffect(() => {
    document.title = '404 - Page Not Found'
    return () => {
      document.title = 'Paw Finder'
    }
  }, [])

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '50px',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Oops! The page you are looking for doesn't exist or has been moved.</p>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px'
        }}
      >
        Go to Home Page
      </Link>
    </div>
  )
}

export default NotFound
