import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const NewBlog = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()
  const handleNewBlog = (event) => {
    event.preventDefault()

    props.createBlog({
      title, author, url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
    dispatch(setNotification(`New entry with a title of ${title} created`,'success', 3))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          author
          <input
            id='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          title
          <input
            id='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          url
          <input
            id='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create">create</button>
      </form>
    </div>
  )
}

export default NewBlog