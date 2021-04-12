import React from 'react'
import { ALL_AUTHORS } from '../queries'
import { useQuery } from '@apollo/client'

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS)

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
    </div>
  )
}

export default Authors
