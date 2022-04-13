import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../queries"
import Notify from "./Notify"


const LoginForm = ({show, setError, setToken, err, setPage}) => {
  
  let style = show 
  ? { display: 'block' }
  : { display: 'none' }
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('user-token', token)
    }
  }, [result.data] )

  const submit = async (event) => {
    event.preventDefault()
    await login({variables: {username, password}})
    setPage('authors')

  }

  return (
    <div style={style}>
      <Notify errorMessage={err} />
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm