import { useState } from 'react'
import styled from 'styled-components'

const Button = styled.button`
  background: #08031f;
  color: aliceblue;
  font-family: Ubuntu, sans-serif;
  font-weight: 300;
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid aliceblue;
  border-radius: 5px;
`
const Login = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`
const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap:2px;
`

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onLogin(username, password)
  }

  return (
    <Login>
      <h2>Log in to application</h2>

      <Form onSubmit={handleSubmit}>
        <Div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            id='username'
          />
        </Div>
        <Div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            id="password"
          />
        </Div>
        <Button id="login-button" type="submit">
          login
        </Button>
      </Form>
    </Login>
  )
}

export default LoginForm