import { useSignIn } from '../../hooks/useSignIn'

const SignIn = () => {
  const { values, handleChange, handleSubmit, errors, touched, error, loading } = useSignIn()
  return (
    <>
      <div>
        <h2>Sign In</h2>

        <form onSubmit={handleSubmit}>
          <input name="email" placeholder="Email" value={values.email} onChange={handleChange} />
          {touched.email && errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
          <input
            name="password"
            placeholder="Password"
            type="password"
            value={values.password}
            onChange={handleChange}
          />
          {touched.password && errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
          <button type="submit" disabled={loading}>
            Sign In
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

export default SignIn
