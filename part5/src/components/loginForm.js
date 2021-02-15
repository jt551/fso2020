import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const LoginForm = ({ setUser, setUserMessage, setMessageType }) => {
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
      <h2>Login Form</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
          Username<br/>
          <input
            id="login-form-username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
          </label>          
        </div>
        <div>
        <label>
        Password<br/>
        <input
            id="login-form-password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </label> 
        </div>
        <button id="login-form-button" type="submit">Login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setUserMessage: PropTypes.func.isRequired,
  setMessageType: PropTypes.func.isRequired,
}

export default LoginForm
