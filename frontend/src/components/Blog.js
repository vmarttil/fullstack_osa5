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

  if (details === true && user.id === blog.user._id) {
    return (
      <div className="blogEntry">
        &lsquo;{blog.title}&rsquo; by {blog.author}
        <button className="hideButton" onClick={toggleDetails}>hide</button>
        <div>
          {blog.url}<br />
          likes {blog.likes}<button className="likeButton" onClick={addLike}>like</button><br />
          {blog.user.name}<br />
          <button className="removeButton" onClick={removeBlog}>remove</button>
        </div>
      </div>
    )
  } else if (details === true) {
    return (
      <div className="blogEntry">
        &lsquo;{blog.title}&rsquo; by {blog.author}
        <button className="hideButton" onClick={toggleDetails}>hide</button>
        <div>
          {blog.url}<br />
          likes {blog.likes}<button className="likeButton" onClick={addLike}>like</button><br />
          {blog.user.name}<br />
        </div>
      </div>
    )
  } else {
    return (
      <div className="blogEntry">
        &lsquo;{blog.title}&rsquo; by {blog.author}
        <button className="viewButton" onClick={toggleDetails}>view</button>
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog
