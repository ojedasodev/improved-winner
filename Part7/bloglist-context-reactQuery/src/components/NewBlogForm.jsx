import { useState } from 'react'
import PropTypes from 'prop-types'
const NewBlogForm = ({ handleNewBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const formOnSubmit = (event) => {
    event.preventDefault()
    handleNewBlog({
      title,
      author,
      url
    })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return <>
    <h2>Add new blog</h2>
    <form onSubmit={formOnSubmit}>
      <div>
          title:
        <input
          data-testid={'title'}
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
                author:
        <input
          data-testid={'author'}
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
                url:
        <input
          data-testid={'url'}
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  </>
}

NewBlogForm.propTypes = {
  handleNewBlog: PropTypes.func.isRequired
}

export default NewBlogForm