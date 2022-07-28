import { Link } from 'react-router-dom'

// Style
import './Navbar.css'
import Temple from '../../assets/temple.svg'
export const Navbar = () => {
  return (
    <div className='navbar'>
      <ul>
        <li className='logo'>
          <img src={Temple} alt='logo' />
          <span>The Chat</span>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/sign-up'>Sign Up</Link>
        </li>
        <li>
          <button className='btn'>Logout</button>
        </li>
      </ul>
    </div>
  )
}
