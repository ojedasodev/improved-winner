import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog, username }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisible = () => {
    setVisible(!visible)
  }

  const handleLikeBtnClick = () => {
    updateBlog(blog.id, {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    })
  }

  return <>
    <div style={blogStyle} className={'blog'}>
      <span>{blog.title} {blog.author}</span>
      <button onClick={toggleVisible}>{visible ? 'hide' : 'view'}</button>
      <div style={showWhenVisible} className={'blogDetails'}>
        <div>
          {blog.url}
        </div>
        <div>
          likes: {blog.likes}
          <button onClick={handleLikeBtnClick}>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        {blog.user.username === username && (<button onClick={() => deleteBlog(blog)}>remove</button>)}
      </div>
    </div>
  </>
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
}


export default Blog
