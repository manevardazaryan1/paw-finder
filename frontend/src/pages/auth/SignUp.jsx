import { useSignUp } from '../../hooks/useSignUp'

const SignUp = () => {
  const { values, handleChange, handleSubmit, errors, touched, error, loading } = useSignUp()
  return (
    <>
      <div>
        <h2>Sign Up</h2>

        <form onSubmit={handleSubmit} noValidate>
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
          />
          {touched.name && errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
          />
          {touched.email && errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
          <input
            name="password"
            placeholder="Password"
            type="password"
            value={values.password}
            onChange={handleChange}
          />
          {touched.password && errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
          <input
            name="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <p style={{ color: 'red' }}>{errors.confirmPassword}</p>
          )}
          <button type="submit" disabled={loading}>
            Sign Up
          </button>
        </form>

        {error && (
          <p style={{ color: 'red' }}>
            {error.map((line, idx) => (
              <span key={idx}>
                {line}
                <br />
              </span>
            ))}
          </p>
        )}
      </div>
    </>
  )
}

export default SignUp
