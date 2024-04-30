import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes'

export const fetchAnecdotes = createAsyncThunk('anecdotes/fetchAnecdotes', async (thunkAPI) => {
  const response = await anecdoteService.getAll()
  return response
})
export const likeAnecdote = createAsyncThunk('anecdotes/likeAnecdote', async ({ id, anecdote }, thunkAPI) => {
  const response = await anecdoteService.update(id, anecdote)
  return response
})

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    sortAnecdotes(state, action) {
      switch (action.payload) {
        case 'descending':
          state.sort((a, b) => b.votes - a.votes)
          break
        case 'ascending':
          state.sort((a, b) => a.votes - b.votes)
          break
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAnecdotes.fulfilled, (state, action) => {
      return action.payload
    }),
      builder.addCase(likeAnecdote.fulfilled, (state, action) => {
        return state.map(anecdote => {
          if (anecdote.id === action.payload.id) {
            return action.payload
          }
          return anecdote
        })
      })
  }
})

export const { appendAnecdote, sortAnecdotes } = anecdotesSlice.actions
export default anecdotesSlice.reducer
