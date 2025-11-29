import { useSignUp } from '../../hooks/useSignUp'
import background from '../../assets/images/background/auth-background.jpg'

const SignUp = () => {
  const { values, handleChange, handleSubmit, errors, touched, error, loading } = useSignUp()
  return (
    <div
      className="relative w-full bg-black h-[calc(100vh-80px)] pt-8"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center mt-8">Sign Up</h2>
      <div className="w-[90%] max-w-lg md:w-full mx-auto bg-white rounded-md shadow-md m-5 p-6">
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              value={values.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {touched.name && errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {touched.email && errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              value={values.password}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {touched.password && errors.password && (
              <p style={{ color: 'red' }}>{errors.password}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="mb-1 font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sign Up
          </button>
        </form>
        {error && (
          <div className="mt-4 bg-red-50 border border-red-300 text-red-600 text-sm rounded-md p-3">
            {error.map((line, idx) => (
              <span key={idx}>
                {line}
                <br />
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SignUp
