import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notificationChange(state, action) {
      const note = action.payload
      return  note
    },

    notificationOut(state, action) {
      return initialState
    },



  }
})


export const { notificationChange, notificationOut } = notificationSlice.actions

export const setNotification = (text, time) => {

  return (dp) => {
    dp(notificationChange(text))
    setTimeout(() => dp(notificationOut()), time*1000)
  }
} 

export default notificationSlice.reducer