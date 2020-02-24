import React, { useState } from 'react'
const Blog = ({ blog, updateBlog }) => {
  const [details, setDetails] = useState(false)

  const showWhenDetails = { display: details ? '' : 'none' }
  const hideWhenDetails = { display: details ? 'none' : '' }

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
    console.log(blog.id)
    updateBlog(blog.id, blogObject)
  }


  return (
    <div className="blogEntry">
      '{blog.title}' by {blog.author} 
      <button style={hideWhenDetails} onClick={toggleDetails}>view</button>
      <button style={showWhenDetails} onClick={toggleDetails}>hide</button>
      <div style={showWhenDetails}>
        {blog.url}<br/>
        likes {blog.likes}<button onClick={addLike}>like</button><br/>
        {blog.user.name}
      </div>
    </div>
  )
}

export default Blog
