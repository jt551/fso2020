const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v1: uuid } = require('uuid')

require('dotenv').config()
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const Author = require('./schemas/Author')
const Book = require('./schemas/Book')
const User = require('./schemas/User')

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

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
    me: User
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
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
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
    addBook: async (root, args, { currentUser }) => {
      // Find author and add if missing
      if(!currentUser){
        throw new AuthenticationError("not authenticated")
      }
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

    editAuthor: async (root, args, { currentUser }) => {

      if(!currentUser){
        throw new AuthenticationError("not authenticated")
      }
      
      const authorQueryResult = await Author.findOne({
        name: args.name,
      }).exec()

      if (!authorQueryResult) return null

      authorQueryResult.born = args.setBornTo

      try {
        await authorQueryResult.save()
      } catch (error) {
        console.log("Error : ", error.message)
        throw new UserInputError('UserInputError -> ' + error.message, {
          invalidArgs: args,
        })
      }
      return authorQueryResult
    },

    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })

      return user.save().catch((error) => {
        console.log("Error : ", error.message)
        throw new UserInputError(error.message, {          
          invalidArgs: args,
        })
      })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id).populate(
        'friends'
      )
      return { currentUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
