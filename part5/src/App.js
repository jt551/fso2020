import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import AddBlogForm from './components/AddBlogForm'
import Toggleable from './components/Toggleable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [userMessage, setUserMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [blogs, setBlogs] = useState([])  
  const [user, setUser] = useState(null)

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

  
  const logoutButtonHandler = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

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
      <Notification message={userMessage} type={messageType} />
      {user === null ? (
        <LoginForm setUser={setUser} setUserMessage={setUserMessage} setMessageType={setMessageType}/>
      ) : (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={logoutButtonHandler}>Logout</button>
          <Toggleable buttonLabel="Add new blog">
            <AddBlogForm blogs={blogs} setBlogs={setBlogs} />
          </Toggleable>

          {blogList()}
        </div>
      )}
    </div>
  )
}

export default App
