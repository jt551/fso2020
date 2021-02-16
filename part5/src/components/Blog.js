import { useState } from 'react'
import React from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, user, likeButtonHandler }) => {
  const [showDetails, setShowDetails] = useState(false)
  //console.log(blog)
  // Boolean check if current user is the owner of this blog item
  const owner = user.username === blog.user.username
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const likeButtonHandlerOption = async () => {
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

  if (!likeButtonHandler) likeButtonHandler = likeButtonHandlerOption

  const showButtonHandler = () => {
    setShowDetails(true)
  }

  const hideButtonHandler = () => {
    setShowDetails(false)
  }

  const simple = () => (
    <div style={blogStyle}>
      <div>
        <p>
          <span>{blog.author} </span>
          <span>{blog.title}</span>
        </p>
        <button id="showBlogButton" onClick={showButtonHandler} className="showButton">
          Show
        </button>
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
      <button onClick={deleteButtonHandler} style={deleteButtonStyle} className="deleteButton">
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
      <div style={blogStyle} className="blogDiv">
        <div>
          <h4 className="blogTitle">{blog.title}</h4>
          <p>{blog.author}</p>
          <p>{blog.url}</p>
          <p id="blogLikes">
            {blog.likes}{' '}
            <span>
              <button onClick={likeButtonHandler} className="likeButton">
                {' '}
                Like{' '}
              </button>
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
