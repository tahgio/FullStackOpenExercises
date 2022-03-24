//import { useDispatch } from "react-redux"
import { createAn } from "../reducers/anecdoteReducer"
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {
  //const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anedocte.value
    event.target.anedocte.value = ''
    props.createAn(content)
    props.setNotification(`New anecdote: "${content}" added`, 5)
  
  }

    return(
        <div>
          <h2>create new</h2>
          <form onSubmit={addAnecdote}>
            <div>
              <input name="anedocte" />
            </div>
            <button type="submit" >create</button>
          </form>
    </div>
    )
}

const ConnectedForm = connect(
  null,
  {
    createAn,
    setNotification
  }
)(AnecdoteForm) 

export default ConnectedForm
//export default AnecdoteForm