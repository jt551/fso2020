import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [userMessage, setUserMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor]=useState('')
  const [newUrl, setNewUrl]=useState('')
  

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      // SET TOKEN
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )      
      setUser(user)
      setUsername('')
      setPassword('')
      // SET TOKEN
      blogService.setToken(user.token)
    } catch (exception) {
      setUserMessage('Incorrect username or password')
      setMessageType('error')
      setTimeout(() => {
        setUserMessage('')
        setMessageType('')
      }, 5000)
    }
  }
  const logoutButtonHandler = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlogObj = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    const response = await blogService.create(newBlogObj)
    if (response) setBlogs(blogs.concat(response))
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }
  
  const loginForm = () => (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const newBlogForm = () => (
    <form onSubmit={addBlog}>
      <input type="text" value={newAuthor} onChange={({target}) => setNewAuthor(target.value)}></input>
      <input type="text" value={newTitle} onChange={({target}) => setNewTitle(target.value)}></input>
      <input type="text" value={newUrl} onChange={({target}) => setNewUrl(target.value)}></input>
      <button type="submit">Add Blog</button>
    </form>
  )
  const blogList = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
  return (
    <div>
      <h1>Blog app</h1>
      <Notification message={userMessage} type={messageType}/>
      {user === null ? (
        loginForm()
      ) : (
        <div>          
          <p>{user.name} logged in</p><button onClick={logoutButtonHandler}/>
          {newBlogForm()}
          {blogList()}
        </div>
      )}
    </div>
  )
}

export default App
