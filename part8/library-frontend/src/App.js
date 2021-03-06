import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { LOGIN, CURRENT_USER, BOOK_ADDED, ALL_BOOKS } from './queries'
import { useMutation, useQuery } from '@apollo/client'
import { useApolloClient, useSubscription } from '@apollo/client'
import Recommended from './components/Recommended'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const client = useApolloClient()

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })

  const currentUser = useQuery(CURRENT_USER)
  
  useEffect(() => {
    const oldToken = localStorage.getItem('fullstackopenbookapp')
    console.log('oldToken:',oldToken)
    setToken(oldToken)
  }, [])

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('fullstackopenbookapp', token)
    }
  }, [result.data]) // eslint-disable-line

  const updateCacheWith = (addedBook) => {
    console.log('updateCacheWith : ', addedBook)
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(addedBook.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    console.log('updateCacheWith dataInStore.allBooks: ', dataInStore.allBooks)
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const newBook = subscriptionData.data.bookAdded
      console.log(newBook);
      window.alert("New book : " + subscriptionData.data.bookAdded.title.toString() + " by " +
      subscriptionData.data.bookAdded.author.name)
      updateCacheWith(newBook)
    }
  })

  const loginHandler = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
  }

  const logoutHandler = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  
  if (currentUser.loading)  {
    return <div>loading...</div>
  }
  if (currentUser.error)  {
    return <div>error while loading the user...</div>
  }
  console.log('currentUser :',currentUser.data);
  if(!token){
    return (
      <div>
      <form onSubmit={loginHandler}>
        <span>Username </span><input value={username} onChange={({ target }) => setUsername(target.value)} />
        <span>Password </span><input value={password} onChange={({ target }) => setPassword(target.value)} />
        <button type="submit">Login</button> 
      </form>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>        
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />
      
    </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommended')}>recommended</button>
        <button onClick={logoutHandler}>logout</button>
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'} updateCacheWith={updateCacheWith}
      />

      <Recommended
        show={page === 'recommended'} genre={currentUser.data.me.favoriteGenre}
      />

    </div>
  )
}

export default App