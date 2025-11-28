import { Link } from 'react-router-dom'
import background from '../../assets/images/background/main-background.webp'

const Main = () => {
  return (
    <div
      className="relative w-full bg-black h-[calc(100vh-80px)]"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Paw Finder</h1>
        <p className="text-white text-lg md:text-2xl mb-2">
          Helping you report lost or found pets quickly
        </p>
        <p className="text-white text-lg md:text-2xl mb-6">
          Join our community and make a difference for pets in need
        </p>
        <Link
          to="/sign-in"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded shadow-lg transition"
        >
          Go to Sign In
        </Link>
      </div>
    </div>
  )
}

export default Main
