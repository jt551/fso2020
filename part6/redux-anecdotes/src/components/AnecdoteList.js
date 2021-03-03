import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const Anecdote = ({ id, content, votes, voteHandler }) => {
  return (
    <div>
      <div>{content}</div>
      <div>
        has {votes}
        <button onClick={() => voteHandler(id)}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const dispatch = useDispatch()

  const voteHandler = (id) => {
    dispatch(vote(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <Anecdote
          id={anecdote.id}
          content={anecdote.content}
          votes={anecdote.votes}
          voteHandler={voteHandler}
        />
      ))}
    </div>
  )
}
export default AnecdoteList
