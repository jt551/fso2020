const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'FirstTestTitle',
    author: 'TestAuthorOne',
    url: 'UrlOne',
    likes: 11,
    userId: '6002de1798cc0e0d28db3696'
  },
  {
    title: 'TestTitleTwo',
    author: 'TestAuthorTwo',
    url: 'UrlTwo',
    likes: 22,
    userId: '6002de1798cc0e0d28db3696'
  },
  {
    title: 'TestTitleThree',
    author: 'TestAuthorThree',
    url: 'UrlThree',
    likes: 33,
    userId: '6002de1798cc0e0d28db3696'
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = { initialBlogs, blogsInDb, usersInDb }
