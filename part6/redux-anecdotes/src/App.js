import React from 'react'
import AnecdoteForm from '../src/components/AnecdoteForm'
import AnecdoteList from '../src/components/AnecdoteList'
import Notification from '../src/components/Notification'
import Filter from '../src/components/Filter'
const App = () => {
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
