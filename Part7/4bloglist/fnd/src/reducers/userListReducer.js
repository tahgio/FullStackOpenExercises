import { createSlice } from "@reduxjs/toolkit"
import userService from "../services/user"

const UserListSlice = createSlice({
  name:'userlist',
  initialState: [],
  reducers: {
    uListSetter(state, action) {
      return action.payload
    }
  }
})


export const { uListSetter } = UserListSlice.actions

export const initUserList = () => {
  return async dp => {
    let ulist = await userService.getAllUsers()
    dp(uListSetter(ulist))
  }
}

export default UserListSlice.reducer
