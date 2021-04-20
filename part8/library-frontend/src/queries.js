import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    author {
      name
    } 
    genres
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
        name
        born
        bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
        ...BookDetails       
    }
  }
  ${BOOK_DETAILS}
`

export const ADD_BOOK = gql`
  mutation addNewBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!){
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      published
      author{
        name
        }
      genres
      id
    }
  }
`

export const CHANGE_YEAR = gql`
  mutation changeYear($authorToEdit: String!, $born: Int!){
    editAuthor(
      name: $authorToEdit
      setBornTo: $born
    ) {
      name
      born
      id
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const CURRENT_USER = gql`{
  me {    
    username
    favoriteGenre       
  }
}`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  
${BOOK_DETAILS}
`