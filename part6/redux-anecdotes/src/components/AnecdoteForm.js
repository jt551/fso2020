import React from 'react'
import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const formHandler = (event) => {
    event.preventDefault()
    const content = event.target.newInput.value
    event.target.newInput.value = ''
    dispatch(create(content))
  }

  return (
    <form onSubmit={formHandler}>
      <div>
        <input name="newInput" />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm
