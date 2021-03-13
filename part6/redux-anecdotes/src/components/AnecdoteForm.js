import React from 'react'
import { connect } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  //console.log('Props create ',props.create)
  //console.log('Import create',create)
  const formHandler = async (event) => {
    event.preventDefault()
    const content = event.target.newInput.value
    event.target.newInput.value = ''
    props.create(content)
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

export default connect(null, { create })(AnecdoteForm)
