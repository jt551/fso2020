const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')

require('dotenv').config()
const mongoose = require('mongoose')

const Author = require('./schemas/Author')
const Book = require('./schemas/Book')
const MONGODB_URI = process.env.MONGODB_URI


console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!    
    genres: [String!]!
    id: ID!
  }
  type Author {
    name: String!,
    id: ID!
    born: Int
    bookCount: Int   
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: (root, args) => {
      if (!args.author){
        return Book.collection.countDocuments()
      }
      return Book.collection.countDocuments()
      // const booksFilteredByAuthor = books.filter(b => b.author === args.author)
      // return booksFilteredByAuthor.length 
    },

    authorCount: () => Author.collection.countDocuments(),

    allBooks: (root, args) => {      
      let qBooks = Book.find({})

      if (args.author){
        const byAuthor = (book) => 
      book.author === args.author
      qBooks = qBooks.filter(byAuthor)
      }
      if (args.genre){
        const byGenre = (book) => 
      book.genres.includes(args.genre)
      qBooks = qBooks.filter(byGenre)
      }

      return qBooks
    },

    allAuthors: (root, args) => {
      return Author.find({})
    }
  },
  Author: {
    bookCount: (root) => {
      const allBooks = Book.find({})
      const bookList = allBooks.filter(b => b.author === root.name)
      return bookList.length
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      // Find author and add if missing
      const authorQueryResult = await Author.findOne({ name: args.author }).exec()
      if (!authorQueryResult){
        const newAuthor = {
          name: args.author,
          born: null          
        }
        const author = new Author(newAuthor)
        authorQueryResult = await author.save()
      }
      // Add book
      const newBook = new Book({ ...args, author: authorQueryResult })
      
      return newBook.save()
    },

    editAuthor: async (root, args) => {
      const authorQueryResult = await Author.findOne({ name: args.author }).exec()
      if(!authorQueryResult) return null

      authorQueryResult.born = args.setBornTo
      //authors = [ ...authors, authorQueryResult]
      return authorQueryResult.save()
    }
  }  
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})