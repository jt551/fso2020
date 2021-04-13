import React from 'react'
import { ALL_AUTHORS, CHANGE_YEAR } from '../queries'
import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
import Select from 'react-select'

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS)
  const [selectedOption, setSelectedOption] = useState(null)
  const [birthYear, setBirthYear] = useState('')
  const [ changeYear ] = useMutation(CHANGE_YEAR, {
    refetchQueries: [ { query: ALL_AUTHORS }]
  })
  
  const submit = async (event) => {
    event.preventDefault()
    const authorToEdit = selectedOption
    const born = parseInt(birthYear)
    console.log('author check :', authorToEdit, 'type', typeof(authorToEdit), 'year:', born, 'type', typeof(born));
    
    changeYear({ variables: { authorToEdit, born } })
    setBirthYear('')    
  }

  if (!props.show) {
    return null
  }
  if (authors.loading) {
    return <div>loading..</div>
  }
  if (authors.error) {
    return (
      <div>
        <p>there was an error while loading authors..</p>
        <p>{authors.error.message}</p>
      </div>
    )
  }

  const authorListAsObj = authors.data.allAuthors.map( a => (    
    {
      value: a.name,
       label: a.name
    }
  ))

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Set birthyear</h2>
        <Select value={selectedOption} onChange={(value) => setSelectedOption(value.value)} options={authorListAsObj} />
        <form onSubmit={submit}>
        <p>edit <span>{selectedOption}</span>s birthyear</p>
        <input
            value={birthYear}
            onChange={({ target }) => setBirthYear(target.value)} />
        <button type="submit">Set</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
