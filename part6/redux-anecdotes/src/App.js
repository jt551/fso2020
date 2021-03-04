import React from 'react'
import AnecdoteForm from '../src/components/AnecdoteForm'
import AnecdoteList from '../src/components/AnecdoteList'
import Notification from '../src/components/Notification'
const App = () => {
  return (
    <div>      
      <Notification />      
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

export default App
