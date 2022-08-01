import { useFetching } from '../../Hooks/useCollection'
// Components
import { Avatar } from '../Avatar/Avatar'

// Style
import './Users.css'
export const Users = () => {
  const { error, listings } = useFetching('users')
  return (
    <div className='user-list'>
      <h2>All Users</h2>
      {error && <div className='error'>{error}</div>}
      {listings &&
        listings.map(user => (
          <div className='user-list-item' key={user.id}>
            {user.online && <span className='online-user'></span>}
            <span>{user.displayName}</span>
            <Avatar src={user.imgUrl} />
          </div>
        ))}
    </div>
  )
}
