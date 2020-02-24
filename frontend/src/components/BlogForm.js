import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    }
    createBlog(blogObject)
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }
  return (
    <form onSubmit={addBlog}>
      <div>
        Title:
        <input
          id="title"
          type="text"
          value={newBlogTitle}
          name="Title"
          onChange={({ target }) => setNewBlogTitle(target.value)}
        />
      </div>
      <div>
        Author:
        <input
          id="author"
          type="text"
          value={newBlogAuthor}
          name="Author"
          onChange={({ target }) => setNewBlogAuthor(target.value)}
        />
      </div>
      <div>
        URL:
        <input
          id="url"
          type="text"
          value={newBlogUrl}
          name="URL"
          onChange={({ target }) => setNewBlogUrl(target.value)}
        />
      </div>

      <button id="create-button" type="submit">create</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm