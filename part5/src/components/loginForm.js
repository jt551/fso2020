import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({setUser, setUserMessage, setMessageType}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')  

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
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

  return (
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
}
export default LoginForm
