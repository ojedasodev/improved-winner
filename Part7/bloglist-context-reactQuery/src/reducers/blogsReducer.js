import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

export const fetchBlogs = createAsyncThunk(
  'blogs/fetchBlogs', async () => {
    return await blogService.getAll()
  }
)

export const createBlog = createAsyncThunk(
  'blogs/createBlog', async (payload) => {
    const response = await blogService.create(payload)
    return response
  }
)

export const deleteBlog = createAsyncThunk(
  'blogs/deleteBLog', async (payload) => {
    if (window.confirm(`Remove blog ${payload.title} by ${payload.user.name}`)) {
      await blogService.del(payload.id)
      return payload.id
    }
    return
  }
)

export const updateBlog= createAsyncThunk(
  'blogs/updateBlog',async (payload) => {
    const updatedBlog = await blogService.update(payload.id, payload.blog)
    return updatedBlog
  })

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogs: []
  },
  reducers: {
    sort: (state) => {
      const blogsCopy = [...state.blogs]
      blogsCopy.sort((a, b) => b.likes - a.likes)
      state.blogs = blogsCopy
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      state.blogs = action.payload
    })
    builder.addCase(createBlog.fulfilled, (state, action) => {
      state.blogs = action.payload
    })
    builder.addCase(deleteBlog.fulfilled, (state, action) => {
      if (!action) return
      state.blogs = state.blogs.filter((blog) => blog.id !== action)
    })
    builder.addCase(updateBlog.fulfilled, (state, action) => {
      state.blogs = action.payload
    })
  }
})


export const { sort } = blogsSlice.actions

export default blogsSlice.reducer
