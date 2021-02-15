import React, { useState } from 'react'
import blogService from '../services/blogs'

const NewBlogForm = ({ blogs, setBlogs, addBlogHandler }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlogDefaultHandler = async (newBlogObj) => {

    const response = await blogService.create(newBlogObj)
    if (response) setBlogs(blogs.concat(response))

  }

  if (!addBlogHandler) addBlogHandler = addBlogDefaultHandler

  const addBlog = (event) => {
    event.preventDefault()
    const newBlogObj = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }
    addBlogHandler(newBlogObj)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Create a new blog entry</h2>
      <form id="newBlogForm" onSubmit={addBlog}>
        <input
          id="newBlogFormAuthor"
          name="author"
          type="text"
          value={newAuthor}
          onChange={({ target }) => setNewAuthor(target.value)}
        ></input>
        <input
          id="newBlogFormTitle"
          type="text"
          value={newTitle}
          onChange={({ target }) => setNewTitle(target.value)}
        ></input>
        <input
          id="newBlogFormUrl"
          type="text"
          value={newUrl}
          onChange={({ target }) => setNewUrl(target.value)}
        ></input>
        <button id="newBlogFormButton" type="submit">Add Blog</button>
      </form>
    </div>
  )
}

export default NewBlogForm
