import React, { useState } from 'react'
const Blog = ({ blog }) => {
  const [details, setDetails] = useState(false)

  const showWhenDetails = { display: details ? '' : 'none' }
  const hideWhenDetails = { display: details ? 'none' : '' }

  const toggleDetails = () => {
    setDetails(!details)
  }

  return (
    <div className="blogEntry">
      '{blog.title}' by {blog.author} 
      <button style={hideWhenDetails} onClick={toggleDetails}>view</button>
      <button style={showWhenDetails} onClick={toggleDetails}>hide</button>
      <div style={showWhenDetails}>
        {blog.url}<br/>
        likes {blog.likes}<button>like</button><br/>
        {blog.user.name}
      </div>
    </div>
  )
}

export default Blog
