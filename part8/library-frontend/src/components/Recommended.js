
import React from 'react'
import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'
const Recommended = (props) => {

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
  
  
  let filteredBooks = books.data.allBooks.filter(b => b.genres.includes(props.genre))
  
  return (
    <div>
      <h1>Recommended books from fav. genre</h1>      
      
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
          {filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended