import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
  const [details, setDetails] = useState(false)

  const showWhenDetails = { display: details ? '' : 'none' }
  const hideWhenDetails = { display: details ? 'none' : '' }
  const showWhenAddedByUser = { display: user.id === blog.user._id }

  const toggleDetails = () => {
    setDetails(!details)
  }

  const addLike = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user._id,
      likes: blog.likes + 1
    }
    updateBlog(blog.id, blogObject)
  }

  const removeBlog = async (event) => {
    event.preventDefault()
    deleteBlog(blog)
  }


  return (
    <div className="blogEntry">
      &lsquo;{blog.title}&rsquo; by {blog.author}
      <button style={hideWhenDetails} onClick={toggleDetails}>view</button>
      <button style={showWhenDetails} onClick={toggleDetails}>hide</button>
      <div style={showWhenDetails}>
        {blog.url}<br />
        likes {blog.likes}<button onClick={addLike}>like</button><br />
        {blog.user.name}<br />
        <button className="removeButton" style={showWhenAddedByUser} onClick={removeBlog}>remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog
