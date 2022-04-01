import { createSlice } from "@reduxjs/toolkit"
import bgService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {

    remove(state, action) {
      let id = action.payload
      return state
        .filter(e => e.id !== id ? true : false)
    },

    vote(state, action) {
      let id = action.payload.id
      return state
        .map(e => e.id !== id ? e : action.payload)
    },
    append(state, action) {
      state.push(action.payload)
    },

    setter(state, action) {
      return action.payload.sort((a,b) => b.likes - a.likes)
    }
  }
})

export const { setter, append, vote, remove } = blogSlice.actions

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await bgService.getAll()
    dispatch(setter(blogs))
  }
}

export const createBlog = content => {
  return async dp => {
    const newBlog = await bgService.create(content)
    dp(append(newBlog))
  }
}

export const upvoteBlog = content => {
  let liked = {
    ...content,
    likes: (content.likes||0) + 1,
    user: content.user.id
  }
  return async dp => {
    const toChg = await bgService.update(liked.id, liked)
    dp(vote(toChg))
  }

}

export const blogRemover = content => {
  return async dp => {
    await bgService.remove(content.id)
    dp(remove(content.id))
  }
}

export default blogSlice.reducer
