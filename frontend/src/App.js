import React, { useState, useEffect } from 'react'
import './App.css'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login' 


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const noteFormRef = React.createRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    noteFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    setInfoMessage(`A new blog, "${returnedBlog.title}" by ${returnedBlog.author} added.`)
    setTimeout(() => {
      setInfoMessage(null)
    }, 5000)
  }

  const updateBlog = async (id, blogObject) => {
    await blogService.update(id, blogObject)
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
    
  }

const loginForm = () => (
  <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin} />
)

const blogForm = () => (
  <Togglable buttonLabel='new blog' ref={noteFormRef}>
    <h3>Create new</h3>
    <BlogForm createBlog={addBlog} />
  </Togglable>
)

const loggedContent = () => (
  <div>
    <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
    {blogForm()}
    {blogs.map(blog => <Blog key={blog.id} blog={blog} updateBlog={updateBlog}/>)}
  </div>
)

  return (
    
    <div>
      <h2>Blogs</h2>
      <Notification message={errorMessage} type='error' />
      <Notification message={infoMessage} type='info' />
      {user === null ? 
      loginForm() :
      loggedContent()
    }
      
    </div>
  )
}

export default App