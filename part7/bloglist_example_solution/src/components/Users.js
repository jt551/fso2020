import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import userService from '../services/users'
//import blogService from './services/blogs'
const Users = () => {
  const [users, setUsers] = useState([])
  //const [blogs, setBlogs] = useState([])

  useEffect(() => {
    userService.getAllUsers().then((users) => setUsers(users))
  }, [])
  //   useEffect(() => {
  //     blogService.getAll().then((blogs) => setBlogs(blogs))
  //   }, [])
  //console.log(users[0].id)
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <Link to={`/users/${user.id}`}>{user.name}  </Link>
          <strong>
            Blogs created : <span>{user.blogs.length}</span>
          </strong>
        </div>
      ))}
    </div>
  )
}
export default Users
