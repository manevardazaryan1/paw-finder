import { useSignIn } from '../../hooks/useSignIn'
import background from '../../assets/images/background/auth-background.jpg'

const SignIn = () => {
  const { values, handleChange, handleSubmit, errors, touched, error, loading } = useSignIn()

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
      <h2 className="text-2xl font-semibold text-gray-800 text-center">Sign In</h2>
      <div className="w-[90%] max-w-lg md:w-full mx-auto bg-white rounded-md shadow-md m-5 p-6">
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
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
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sign In
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

export default SignIn
