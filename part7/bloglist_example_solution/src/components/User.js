import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import userService from '../services/users'

const User = () => {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState(null)
  const id = useParams().id

  useEffect(() => {
    userService.getAllUsers().then((apiusers) => setUsers(apiusers))

    const res = users.find((u) => u.id === String(id))
    if (res) setUser(res)

    console.log('useEffect all users', users)
  }, [])
  if (!user)
    return (
      <div>
        <h2>User page</h2>
      </div>
    )
  return (
    <div>
      <h2>User page</h2>
      <h2>{user.name}</h2>
      <div>{user.username}</div>
      <div>
        <h3>Blogs</h3>
        {user.blogs.map((b) => (
          <div key={b.id}>
            <p>{b.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
export default User
