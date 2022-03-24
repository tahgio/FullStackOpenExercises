import { createSlice } from '@reduxjs/toolkit'
import anService from '../services/anecdotes'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]



// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// export const vote = (id) => {
//   return {
//     type: 'VOTE',
//     data: {id}
//   }
// }

// export const createNew = (content) => {
//   return({
//     type:'CREATE_NEW',
//     data: {
//       content,
//       votes: 0,
//       id: getId()
//     }
//   })

// }



//const initialState = anecdotesAtStart.map(asObject)

// const anecdoteReducer = (state = initialState, action) => {
 
//   switch (action.type) {
//     case 'CREATE_NEW':
//       return [...state.anecdotes, action.data]
//     case 'VOTE':
//       console.log(action.type, action.data.votes);
//       let id = action.data.id
//       let tochange = state.find(e=> e.id === action.data.id)
//       let changed = {
//         ...tochange,
//         votes: tochange.votes + 1
//       }    

//       return state.anecdotes.map(e=> e.id !== id ? e : changed).sort((a,b)=>b.votes - a.votes)
//   }

//   return state
// }

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    // vote(state, action) {
    //  const id = action.payload
    //  const tochange = state.find(e=> e.id === id)
    //  const changed = {
    //    ...tochange,
    //    votes: tochange.votes + 1
    //  }
    //  return state.map(
    //    e => e.id !== id ? e : changed).sort((a,b)=>b.votes - a.votes
    //    )
    // },

    vote(state, action) {
      let id = action.payload.id
      return state
        .map(e => e.id !== id ? e : action.payload)
        //.sort((a,b) => b.votes - a.votes )
    },

    appendAn(state, action) {
      state.push(action.payload)
    },

    setter(state, action) {
      return action.payload
    },

  }

})



export const { vote, setter, appendAn } = anecdoteSlice.actions

export const initAn = () => {
  return async dp => {
    const ans = await anService.getAll()
    dp(setter(ans)) 
  }
}

export const createAn = content => {
  return async dispatch => {
    const newAn = await anService.createNew(content)
    dispatch(appendAn(newAn))
  }}

export const upvoteAn = content => {
  let nobj = {...content, votes: content.votes + 1}
  return async dp => {
    const toChg = await anService.update(nobj)
    dp(vote(toChg))
  }
}

export default anecdoteSlice.reducer