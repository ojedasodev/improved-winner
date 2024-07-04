import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const setNotification = createAsyncThunk('notification/setNotification', async (payload) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, payload.duration * 1000)

  })
  return payload
})


const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    show: false,
    type: ''
  },
  extraReducers: (builder) => {
    builder.addCase(setNotification.pending, (state, action) => {
      console.log(action)
      state.message = action.meta.arg.message
      state.show = true
      state.type = action.meta.arg.type
    })
    builder.addCase(setNotification.fulfilled, (state) => {
      state.message = ''
      state.show = false
      state.type = ''
    })
  }
})

export default notificationSlice.reducer
