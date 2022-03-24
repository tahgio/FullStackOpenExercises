import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './notificationReducer'
import anecdoteReducer, {setter} from './anecdoteReducer'
import filterReducer from './filterReducer'
import anService from '../services/anecdotes'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer
  }
})

// anService.getAll()
//   .then(
//     an => store.dispatch(setter(an))
//   )

export default { store }