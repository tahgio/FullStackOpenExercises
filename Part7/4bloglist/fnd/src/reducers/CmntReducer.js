import { createSlice } from "@reduxjs/toolkit"
import cmtSvc from '../services/comments'

const cmtSlice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
    append(state,action) {
      state.push(action.payload)
    },

    setter(state, action) {
      return action.payload
    }
  }
})

export const { append, setter } = cmtSlice.actions

export const initCmts = (id) => {
  return async dp => {
    let cmts = await cmtSvc.getComments(id)
    dp(setter(cmts))
  }
}

export const createCmt = (id, cmt) => {
  let obj = {comment: cmt}
  return async dp => {
    let newCmt = await cmtSvc.createComment(id, obj)
    dp(append(newCmt))
  }
}

export default cmtSlice.reducer