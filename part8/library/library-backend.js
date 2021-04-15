const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v1: uuid } = require('uuid')

require('dotenv').config()
const mongoose = require('mongoose')

const Author = require('./schemas/Author')
const Book = require('./schemas/Book')
const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
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
    name: String!
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
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Query: {
    bookCount: (root, args) => {
      // if (!args.author) {
      //   return Book.collection.countDocuments()
      // }
      return Book.collection.countDocuments()
    },

    authorCount: () => Author.collection.countDocuments(),

    allBooks: async (root, args) => {
      let qBooks = await Book.find({}).populate('author')

      if (args.author) {
        const authorQueryResult = await Author.findOne({ name: args.author })

        const byAuthor = (book) => book.author === authorQueryResult
        qBooks = qBooks.filter(byAuthor)
      }
      if (args.genre) {
        const byGenre = (book) => book.genres.includes(args.genre)
        qBooks = qBooks.filter(byGenre)
      }

      return qBooks
    },

    allAuthors: (root, args) => {
      return Author.find({})
    },
  },
  Author: {
    bookCount: async (root) => {
      return Book.countDocuments({ author: root })
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      // Find author and add if missing
      let authorQueryResult = await Author.findOne({ name: args.author }).exec()
      if (!authorQueryResult) {
        const newAuthor = {
          name: args.author,
          born: null,
        }
        const author = new Author(newAuthor)
        try {
          authorQueryResult = await author.save()
        } catch (error) {
          throw new UserInputError('UserInputError -> ' + error.message, {
            invalidArgs: args,
          })
        }
      }
      // Add book
      const newBook = new Book({ ...args, author: authorQueryResult })
      try {
        await newBook.save()
      } catch (error) {        
        throw new UserInputError('UserInputError -> ' + error.message, {
          invalidArgs: args,
        })
      }
      return newBook
    },

    editAuthor: async (root, args) => {
      const authorQueryResult = await Author.findOne({
        name: args.name,
      }).exec()

      if (!authorQueryResult) return null

      authorQueryResult.born = args.setBornTo

      try {
        await authorQueryResult.save()
      } catch (error) {
        throw new UserInputError('UserInputError -> ' + error.message, {
          invalidArgs: args,
        })
      }
      return authorQueryResult
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
