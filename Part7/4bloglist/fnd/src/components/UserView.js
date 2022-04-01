import { useSelector } from "react-redux"
import Togglable from "./Togglable"
import { Link } from 'react-router-dom'

const OneUser = ({e}) => {
  return (
    <tr>
      <td>
      <Link to={`/user/${e.id}`}>
      {e.username}
      </Link>
      </td>
      <td>{e.blogs.length}</td>
    </tr>
    
  )
}


const UserView = ({className}) => {
  const users = useSelector(st => st.userList)
  return (
    <div className={className}>
      <h2>Users</h2>
      <table>
      <thead>
        <tr>
          <td></td>
          <td><strong>blogs created</strong></td>
        </tr>
      </thead>
      <tbody>
        {users
          .map(
            e => <OneUser key={e.id} e={e} />
          )}
      </tbody>
      </table>
    </div>
  )
}

export default UserView