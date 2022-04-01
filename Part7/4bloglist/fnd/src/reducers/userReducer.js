import { createSlice } from "@reduxjs/toolkit"
import userService from '../services/user'
import loginService from '../services/login'


const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    userSet(state, action) {
      let user = {
        username: action.payload.username,
      }
      return user
    },
    userClear(state, action) {
      state = null
      return state
    }
  }

})


export const { userSet, userClear } = userSlice.actions

export const svdUser = () => {
  return async dp => {
    let svd = await userService.getUser()
    if (svd) {
      dp(userSet(svd))
    }
  }
}

export const logUser = (userFull) => {
  return async dp => {
    let logged = await loginService.login(userFull)
    userService.setUser(userFull)
    dp(userSet(logged))
  }
}

export const clrUser = () => {
  return async dp => {
    await userService.clearUser()
    dp(userClear())
  }
}

export default userSlice.reducer