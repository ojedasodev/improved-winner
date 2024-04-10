import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import authService from './services/auth'

import LoginForm from './components/LoginForm.jsx'
import NewBlogForm from './components/NewBlogForm.jsx'
import Notification from './components/Message.jsx'
import Toggleable from './components/Toggleable.jsx'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({ message: '', type: ''  })

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
    {
      setBlogs( blogs )
    }
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const toggleMessage = (message, type) => {
    setMessage({ message, type })
    setTimeout(function() {
      setMessage({ message: '', type: '' })
    }, 2000)
  }

  const login = async (username, password) => {
    try{
      const user = await authService.login(username, password)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    }catch (exception){
      console.log('error -->', exception.message)
      toggleMessage('username or password incorrect, try again', 'error')
    }
  }

  const newBlog = async (newObject) => {
    try{
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(newObject)
      setBlogs(blogs.concat(newBlog))
      toggleMessage('a new blog has been added', 'success')
    }catch (e) {
      console.log('error', e)
      toggleMessage('error adding new blog', 'error')
    }
  }

  const update = async (id,blog) => {
    const updated = await blogService.update(id, blog)
    setBlogs(updated)
  }

  const delBlog = async (blogToUpdate) => {
    try{
      if(window.confirm(`Remove blog ${blogToUpdate.title} by ${blogToUpdate.user.name}`)){
        await blogService.del(blogToUpdate.id)
        const filteredBlogs = blogs.filter((blog) => blog.id !== blogToUpdate.id )
        setBlogs(filteredBlogs)
      }
    }catch (exception) {
      toggleMessage(exception, 'error')
    }
  }

  const sort = () => {
    const sortedBlogs = [...blogs]
    sortedBlogs.sort((a,b) => b.likes - a.likes )
    setBlogs(sortedBlogs)
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  if(user === null) return <>
    <h2>Blogs</h2>
    <h1>Log in to application</h1>
    <Toggleable buttonLabel={'login'}>
      <Notification message={message}/>
      <LoginForm handleLogin={login}/>
    </Toggleable>
  </>

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message}/>
      <span>{user.name} is logged in</span>
      <button onClick={logOut}>log out</button>
      <Toggleable buttonLabel={'new blog'} ref={blogFormRef}>
        <NewBlogForm handleNewBlog={newBlog}/>
      </Toggleable>
      <button onClick={() => sort()}>sort</button>
      { blogs && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={update} deleteBlog={delBlog} username={user.username}/>
      )}
    </div>
  )
}

export default App