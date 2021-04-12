
import React from 'react'
import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

const Books = (props) => {

  const books = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }
  if (books.loading) {
    return <div>loading..</div>
  }
  if (books.error) {
    return (
      <div>
        <p>there was an error while loading the books..</p>
        <p>{books.error.message}</p>
      </div>
    )
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books