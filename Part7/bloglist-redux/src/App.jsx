/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import blogService from './services/blogs'
import authService from './services/auth'

import LoginForm from './components/LoginForm.jsx'
import NewBlogForm from './components/NewBlogForm.jsx'
import Notification from './components/Message.jsx'
import Toggleable from './components/Toggleable.jsx'
import Blog from './components/Blog'

import { setNotification } from './reducers/notificationReducer.js'
import { createBlog, deleteBlog, fetchBlogs, sort, updateBlog } from './reducers/blogsReducer.js'

const App = () => {
  const { blogs } = useSelector(({ blogs }) => {
    return blogs
  })
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(fetchBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const login = async (username, password) => {
    try {
      const user = await authService.login(username, password)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      console.log('error -->', exception.message)
      dispatch(setNotification({
        message: 'username or password incorrect',
        duration: 5,
        type: 'error'
      }))
    }
  }

  const newBlog = async (newObject) => {
    try {
      dispatch(createBlog(newObject))
      dispatch(setNotification({
        message: 'new blog added',
        duration: 5,
        type: 'success'
      }))
    } catch (e) {
      console.log('error', e)
      dispatch(setNotification({
        message: 'error adding new blog',
        duration: 5,
        type: 'error'
      }))
    }
  }

  const update = async (id, blog) => {
    dispatch(updateBlog({ id, blog }))
  }

  const delBlog = async (blogToUpdate) => {
    try {
      dispatch(deleteBlog(blogToUpdate))
    } catch (exception) {
      dispatch(setNotification({
        message: 'error deleting blog',
        duration: 5,
        type: 'error'
      }))
    }
  }

  const sortBlogs = () => {
    dispatch(sort())
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  if (user === null) return <>
    <h2>Blogs</h2>
    <h1>Log in to application</h1>
    <Toggleable buttonLabel={'login'}>
      <Notification />
      <LoginForm handleLogin={login} />
    </Toggleable>
  </>

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <span>{user.name} is logged in</span>
      <button onClick={logOut}>log out</button>
      <Toggleable buttonLabel={'new blog'} ref={blogFormRef}>
        <NewBlogForm handleNewBlog={newBlog} />
      </Toggleable>
      <button onClick={() => sortBlogs()}>sort</button>
      {blogs && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={update} deleteBlog={delBlog} username={user.username} />
      )}
    </div>
  )
}

export default App
