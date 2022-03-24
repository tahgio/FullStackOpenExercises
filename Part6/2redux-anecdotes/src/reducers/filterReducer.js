import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    newFilter(state, action) {
      let filter = action.payload
      return filter
    }
  }
}) 

export const { newFilter } = filterSlice.actions
export default filterSlice.reducer