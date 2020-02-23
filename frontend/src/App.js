import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login' 


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {

    }
  }
   
const loginForm = () => (
  <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin} />
)

const blogList = () => {
  return (
    <div>
      <p>{user.name} logged in </p>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
    )
}

  return (
    
    <div>
      <h2>Blogs</h2>

      {user === null ? 
      loginForm() :
      blogList()
      
    }
      
    </div>
  )
}

export default App