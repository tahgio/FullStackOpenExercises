import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link, 
  useParams, useMatch, useNavigate
} from "react-router-dom"

import Menu from './modules/menu'
import AnecdoteList from './modules/AnecdoteList'
import About from './modules/About'
import Footer from './modules/Footer'
import CreateNew from './modules/CreateNew'
import Single from './modules/Single'

const App = () => {
  const navigate = useNavigate()

  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    navigate('/')
    setNotification(`New anecdote: "${anecdote.content}" created!`)
    setTimeout(()=> setNotification(''), 5*1000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useMatch('/anecdote/:id')
  const single = match
    ? anecdotes.find(e => e.id === Number(match.params.id))
    : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification ? <p>{notification}</p> : null}
      <Routes>
        <Route path="/anecdote/:id" element=
        {<Single single={single} />}
        />
        <Route path="/" element=
          { <AnecdoteList anecdotes={anecdotes} /> } 
        />
        <Route path="/about" element=
          { <About /> } 
        />
        <Route path="/create" element=
          { <CreateNew addNew={addNew} /> } 
        />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
