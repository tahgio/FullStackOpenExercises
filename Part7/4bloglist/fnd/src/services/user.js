/* eslint-disable import/no-anonymous-default-export */
import axios from "axios"

let token = null



const STORAGE_KEY = 'loggedBlogAppUser'

const getAllUsers = async (user) => {
  let getter = await axios.get('./api/users')
  return getter.data
}

const setUser = (user) => {
  window.localStorage.setItem(
    STORAGE_KEY, JSON.stringify(user)
  )
  token = user.token
}

const getUser = () => {
  const loggedUserJSON = window.localStorage.getItem(STORAGE_KEY)
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    token = user.token
    return user
  }

  return null
}

const clearUser = () => {
  localStorage.clear()
  token = null
}

const getToken = () => token

export default {
  getAllUsers, setUser, getUser, clearUser, getToken
}