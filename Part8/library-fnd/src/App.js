import { useApolloClient, useSubscription } from '@apollo/client'
import { useEffect, useState } from 'react'

import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import { BOOK_ADDED } from './queries'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const local = localStorage.getItem('user-token')

  useEffect(() => {
    setToken(local)
  }, [])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(`${subscriptionData.data.bookAdded.title} created with success`)
    }
  })

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const withToken = {
    display: token ? 'initial' : 'none'
  }

  const noToken = {
    display: token ? 'none' : 'initial'
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button style={withToken} onClick={() => setPage('add')}>add book</button>
        <button style={withToken} onClick={() => setPage('recommend')}>recommend</button>
        <button style={withToken} onClick={() => logout()}>logout</button>
        <button style={noToken} onClick={() => setPage('login')}>login</button>
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} page={setPage}/>
      
      {token ? <Recommend show={page === 'recommend'} /> : null}

      <LoginForm show={page === 'login'}
      setToken={setToken}
      setError={notify}
      setPage={setPage}
      err={errorMessage}
    />

      

    </div>
  )
}

export default App
