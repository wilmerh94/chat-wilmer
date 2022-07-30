import { Link } from 'react-router-dom'
import { useLogout } from '../../Hooks/useLogout'
import { useAuthContext } from '../../Hooks/useAuthContext'

// Style
import './Navbar.css'
import Temple from '../../assets/temple.svg'
export const Navbar = () => {
  const { logOut, isLoading } = useLogout()
  const { user } = useAuthContext()

  return (
    <div className='navbar'>
      <ul>
        <li className='logo'>
          <img src={Temple} alt='logo' />
          <span>The Chat</span>
        </li>
        {!user && (
          <>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/sign-up'>Sign Up</Link>
            </li>
          </>
        )}
        {user && (
          <li>
            {!isLoading && (
              <button className='btn' onClick={logOut}>
                Logout
              </button>
            )}
            {isLoading && (
              <button className='btn' disabled>
                Logging out...
              </button>
            )}
          </li>
        )}
      </ul>
    </div>
  )
}
