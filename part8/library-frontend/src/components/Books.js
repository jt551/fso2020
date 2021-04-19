
import React, { useState } from 'react'
import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'
import Select from 'react-select'

const Books = (props) => {

  const books = useQuery(ALL_BOOKS)
  const [selectedGenre, setSelectedGenre] = useState('')
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
  const genreSet = new Set()
  genreSet.add('')
  books.data.allBooks.map(g => g.genres.forEach(element => {
    genreSet.add(element)
  }))
  console.log(genreSet);
  const selectHandler = (value) => {
    //console.log(value)
    setSelectedGenre(value.value)
  }
  const GenreSetAsObj = Array.from(genreSet).map( genre => (    
    {
      value: genre,
       label: genre
    }
  ))
  console.log(selectedGenre)
  let filteredBooks = books.data.allBooks
  if(selectedGenre){
    filteredBooks = books.data.allBooks.filter(b => b.genres.includes(selectedGenre))
  }  
  console.log(filteredBooks);
  return (
    <div>
      <h1>BOOKS</h1>
      <h4>Filter by genre</h4>
      <Select value={selectedGenre} onChange={selectHandler} options={GenreSetAsObj} />
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

export default Books