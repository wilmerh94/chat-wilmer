import { useState } from 'react'
import { useLogin } from '../../Hooks/useLogin'

// Style
import './Login.css'
// Form data
const defaultForm = {
  email: '',
  password: ''
}

export const Login = () => {
  // Use state for the formData
  const [formData, setFormData] = useState(defaultForm)
  const { email, password } = formData
  const { error, isLoading, SignIn } = useLogin()
  const handleChange = e => {
    e.preventDefault()

    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }
  const handleSubmit = e => {
    e.preventDefault()
    SignIn(email, password)
  }

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <h2>Login </h2>
      <label>
        <span>Email:</span>
        <input
          id='email'
          type='email'
          required
          onChange={handleChange}
          value={email}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          id='password'
          type='password'
          required
          onChange={handleChange}
          value={password}
        />
      </label>
      {!isLoading && (
        <button className='btn' type='submit'>
          Login
        </button>
      )}

      {isLoading && (
        <button className='btn' disabled>
          Loading...
        </button>
      )}
      {error && <div className='error'>{error}</div>}
    </form>
  )
}
