import React, { useState, useEffect } from 'react'
import './App.css'
import Blog from './components/Blog'
import Login from './components/Login'
import Create from './components/Create'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login' 


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
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

  const handleCreate = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    }
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    setInfoMessage(`A new blog, "${newBlogTitle}" by ${newBlogAuthor} added.`)
    setTimeout(() => {
      setInfoMessage(null)
    }, 5000)
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

const loginForm = () => (
  <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin} />
)

const createForm = () => (
  <Create title={newBlogTitle} setTitle={setNewBlogTitle} author={newBlogAuthor} setAuthor={setNewBlogAuthor} url={newBlogUrl} setUrl={setNewBlogUrl} handleCreate={handleCreate} />
)

const loggedContent = () => (
  <div>
    <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
    <h3>Create new</h3>
    {createForm()}
    {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
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