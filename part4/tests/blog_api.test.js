const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

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
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})
