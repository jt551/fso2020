require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
let MONGO_USER = process.env.MONGO_USER
let MONGO_PASSWORD = process.env.MONGO_PASSWORD
let SECRET = process.env.SECRET
let TEST_PASSWORD = process.env.TEST_PASSWORD
if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
  MONGODB_URI,
  PORT,
  MONGO_USER,
  MONGO_PASSWORD,
  SECRET,
  TEST_PASSWORD
}