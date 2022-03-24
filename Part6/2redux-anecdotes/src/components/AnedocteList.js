import { upvoteAn } from "../reducers/anecdoteReducer"
import { useSelector, useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"


const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const toFilter = useSelector(state => state.filter)
    const not = useSelector(state => state.notification)

    const dispatch = useDispatch()

    const addVote = (e) => {
      dispatch(upvoteAn(e))
      if (not === null || not.indexOf(e.content) === -1 ) {
        return dispatch(setNotification(`You voted for "${e.content}"`, 5))
      } else {
        return null
      }
      
}

    return(
    <div>
        {anecdotes
        .filter(e => e.content.toLowerCase().indexOf(toFilter.toLowerCase()) !== -1)
        .sort((a,b) => b.votes - a.votes)
        .map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => addVote(anecdote)}>vote</button>
              </div>
            </div>
          )}
    </div>
    )
}



export default AnecdoteList