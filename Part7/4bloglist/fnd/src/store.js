import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import NotifyReducer from './reducers/NotifyReducer'
import userReducer from './reducers/userReducer'
import userListReducer from './reducers/userListReducer'
import CmntReducer from './reducers/CmntReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: NotifyReducer,
    user: userReducer,
    userList: userListReducer,
    comments: CmntReducer
  }
})

export default { store }