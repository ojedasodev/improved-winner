import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const setNotification = createAsyncThunk('notification/setNotification', async (payload) => {
	console.log(payload, 'from reducer')
	await new Promise((resolve) => {
		setTimeout(() => {
			resolve(payload.message)
		}, payload.duration * 1000)
	})
	return payload.message
})


const notificationSlice = createSlice({
	name: 'notification',
	initialState: {
		message: '',
		show: false
	},
	reducers: (create) => ({
		toggleNotification: create.reducer((state, action) => {
			if (action.payload) {
				state.message = action.payload
				state.show = true
			} else {
				state.show = false
			}
		})
	}),
	extraReducers: (builder) => {
		builder.addCase(setNotification.pending, (state, action) => {
			console.log('notification pending')
			console.log(action, 'pending')
			state.show = true
			state.message = action.meta.arg.message
		}),
			builder.addCase(setNotification.fulfilled, (state, action) => {
				console.log(action.payload)
				console.log('notification fufilled')
				state.show = false
				state.message = ''
			})
	}
})



export const { toggleNotification } = notificationSlice.actions
export default notificationSlice.reducer


