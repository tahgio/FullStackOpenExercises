import { createSlice } from "@reduxjs/toolkit"
import bgService from '../services/blogs'

let timeoutId = null
const initialState = null

const notifySlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notifyChange(state, action) {
      return action.payload
    }
  }
})

export const { notifyChange } = notifySlice.actions



export const setNotification = (text, time) => {
  return (dp) => {
    dp(notifyChange(text))

    if(timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dp(notifyChange(null))
    }, time * 1000)
  } 
}

export default notifySlice.reducer