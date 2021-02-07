import React, { useState } from 'react'
import blogService from '../services/blogs'

const NewBlogForm = ({ blogs, setBlogs }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlogObj = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }

    const response = await blogService.create(newBlogObj)
    if (response) setBlogs(blogs.concat(response))
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Create a new blog entry</h2>
      <form onSubmit={addBlog}>
        <input
          type="text"
          value={newAuthor}
          onChange={({ target }) => setNewAuthor(target.value)}
        ></input>
        <input
          type="text"
          value={newTitle}
          onChange={({ target }) => setNewTitle(target.value)}
        ></input>
        <input
          type="text"
          value={newUrl}
          onChange={({ target }) => setNewUrl(target.value)}
        ></input>
        <button type="submit">Add Blog</button>
      </form>
    </div>
  )
}

export default NewBlogForm
