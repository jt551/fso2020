import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ id, content, votes, voteHandler }) => {
  return (
    <div>
      <div>{content}</div>
      <div>
        has {votes}
        <button onClick={() => voteHandler(id, content)}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const filter = useSelector((state => state.filter))
  const anecdotes = useSelector((state) => {
    if (!filter) return state.anecdotes
    return state.anecdotes.filter(anecdote => anecdote.content.includes(filter))
  })
  
  const dispatch = useDispatch()

  const voteHandler = async (id, content) => {
    dispatch(vote(id))
    dispatch(setNotification(`You voted for "${content}"`))
    setTimeout(()=> {
      dispatch(setNotification(''))
    },5000)
  }
  
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
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
