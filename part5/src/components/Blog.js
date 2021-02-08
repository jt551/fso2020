import { useState } from 'react'
import React from 'react'
const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const likeButtonHandler = () => {}

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

  const details = () => (
    <div style={blogStyle}>
      <div>
        <h4>{blog.title}</h4>
        <p>{blog.author}</p>
        <p>{blog.url}</p>
        <p>{blog.likes} <span><button onClick={likeButtonHandler}> Like </button></span></p>
        <button onClick={hideButtonHandler}>Hide</button>
      </div>
    </div>
  )

  return (
    <div>
      { showDetails === false ? simple() : details() }
    </div>
    )
}

export default Blog
