import { useState } from 'react'
import { useSignup } from '../../Hooks/useSignup'

// Style
import './SignUp.css'

// Form data
const defaultForm = {
  displayName: '',
  email: '',
  password: ''
}

export const SignUp = () => {
  // Use state for the formData
  const [formData, setFormData] = useState(defaultForm)
  const { displayName, email, password } = formData
  // Use state for any image upload it
  const [formFile, setFormFile] = useState(null)
  const [formFileError, setFormFileError] = useState(null)

  const { error, isLoading, SignUp } = useSignup()

  const handleChange = e => {
    e.preventDefault()

    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }
  const handleFileChange = e => {
    e.preventDefault()
    setFormFile(null)
    let selected = e.target.files[0]
    if (!selected) {
      setFormFileError('Please Select a file')
      return
    }
    if (!selected.type.includes('image')) {
      setFormFileError('Selected file must be an image')
      return
    }
    if (selected.size > 100000) {
      setFormFileError('Image file size must be less than 100kb')
      return
    }
    setFormFileError(null)
    setFormFile(selected)

    console.log('file updated')
  }
  const handleSubmit = e => {
    e.preventDefault()
    SignUp(email, password, displayName, formFile)
  }
  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
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
      <label>
        <span>Display Name:</span>
        <input
          id='displayName'
          type='text'
          required
          onChange={handleChange}
          value={displayName}
        />
      </label>
      <label>
        <span>Profile Picture:</span>
        <input type='file' required onChange={handleFileChange} />
        {formFileError && <div className='error'>{formFileError}</div>}
      </label>
      <button className='btn' type='submit'>
        Sign Up
      </button>
      {/* {isLoading && (
        <button className='btn' disabled>
          Loading...
        </button>
      )} */}
      {error && <div className='error'>{error}</div>}
    </form>
  )
}
