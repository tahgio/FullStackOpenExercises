import { Link } from 'react-router-dom'
import styled from 'styled-components'

const LgoutButton = styled.button`
  background: aliceblue;
  font-family: Ubuntu, sans-serif;
  font-weight: 300;
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid #08031f;
  border-radius: 5px;
`

const Menu = ({user, logout}) => {
  
  return (
  <div id="menu" >
    <div id="links"><Link to="/">blogs</Link>
    <Link to="/user">users</Link></div>
    <div id="logged">{user.username} logged in
    <LgoutButton id="logout" onClick={logout}>logout</LgoutButton></div>
  </div>
  )
}

export default Menu