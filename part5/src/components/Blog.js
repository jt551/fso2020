import { useState } from 'react'
import React from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, user }) => {
  const [showDetails, setShowDetails] = useState(false)

  const owner = user.username === blog.user.username
  // console.log('blog.user',blog.user)
  // console.log('user.username',user.username)
  // console.log(owner, user.username, blog.user.username)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const likeButtonHandler = async () => {
    const blogObj = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }

    //const blogObj = {...blog, likes: blog.likes +1 }
    const response = await blogService.update(blog.id, blogObj)
    //console.log('blogservice response object : ', response)
    setBlogs(
      blogs.map((original) => (original.id !== blog.id ? original : response))
    )
  }

  const showButtonHandler = () => {
    setShowDetails(true)
  }

  const hideButtonHandler = () => {
    setShowDetails(false)
  }

  const simple = () => (
    <div style={blogStyle}>
      <div>
        {blog.title} <button onClick={showButtonHandler}>Show</button>
      </div>
    </div>
  )
  const deleteButtonHandler = async () => {    
    const input = window.confirm(`Delete Blog ${blog.title}. Are you sure?`)
    if (input) {      
      const response = await blogService.remove(blog.id)
      console.log(response)
      const filteredBlogs = blogs.filter((b) => b.id !== blog.id)
      setBlogs(filteredBlogs)
    }
  }
  const deleteButtonStyle = {
    backgroundColor: '#f44336',
    color: 'white',
  }
  const deleteButton = () => {
    return (
      <button onClick={deleteButtonHandler} style={deleteButtonStyle}>
        Delete
      </button>
    )
  }

  const details = () => {
    let button = null
    if (owner) {
      button = deleteButton
    }
    return (
      <div style={blogStyle}>
        <div>
          <h4>{blog.title}</h4>
          <p>{blog.author}</p>
          <p>{blog.url}</p>
          <p>
            {blog.likes}{' '}
            <span>
              <button onClick={likeButtonHandler}> Like </button>
            </span>
          </p>
          <button onClick={hideButtonHandler}>Hide</button>
        </div>
        {owner ? deleteButton() : null}
      </div>
    )
  }

  return <div>{showDetails === false ? simple() : details()}</div>
}

export default Blog
