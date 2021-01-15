const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'FirstTestTitle',
    author: 'TestAuthorOne',
    url: 'UrlOne',
    likes: 11,
  },
  {
    title: 'TestTitleTwo',
    author: 'TestAuthorTwo',
    url: 'UrlTwo',
    likes: 22,
  },
  {
    title: 'TestTitleThree',
    author: 'TestAuthorThree',
    url: 'UrlThree',
    likes: 33,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = { initialBlogs, blogsInDb }
