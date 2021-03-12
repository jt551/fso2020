import React, { useEffect } from 'react'
import AnecdoteForm from '../src/components/AnecdoteForm'
import AnecdoteList from '../src/components/AnecdoteList'
import Notification from '../src/components/Notification'
import Filter from '../src/components/Filter'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>      
      <Notification />          
      <AnecdoteForm />
      <Filter />
      <AnecdoteList />
    </div>
  )
}

export default App
