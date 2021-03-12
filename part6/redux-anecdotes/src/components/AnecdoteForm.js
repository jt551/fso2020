import React from 'react'
import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const formHandler = async (event) => {
    event.preventDefault()
    const content = event.target.newInput.value
    event.target.newInput.value = ''
    const newAnecdote = await anecdoteService.create(content)
    dispatch(create(newAnecdote))
  }

  return (
    
    <form onSubmit={formHandler}>
      <h2>Add an anecdote</h2>
      <div>
        <input name="newInput" />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm
