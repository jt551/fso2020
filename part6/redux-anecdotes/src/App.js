import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote, create } from '../src/reducers/anecdoteReducer'
const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const voteHandler = (id) => {
    dispatch(vote(id))
  }
  const formHandler = (event) => {
    event.preventDefault()
    const content = event.target.newInput.value
    event.target.newInput.value = ''
    dispatch(create(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteHandler(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={formHandler}>
        <div><input name="newInput"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App