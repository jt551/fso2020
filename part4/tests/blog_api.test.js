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

test('returned blogs have id key, not _id', async () => {
  const response = await api.get('/api/blogs')
  const content = response.body[0]
  expect(content.id).toBeDefined()
})

test('valid blog can be added', async () => {
  const newBlog = {
    title: 'newTitleForBlogTest',
    author: 'testAuthor',
    url: 'testUrl',
    likes: 8,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length +1)
  expect(contents).toContain('newTitleForBlogTest')
})

test('if new blogs likes are not defined they are set to zero', async () => {
  const newBlog = {
    title: 'newTitleForBlogTestTwo',
    author: 'testAuthorTwo',
    url: 'testUrlTwo',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const contents = response.body.find(obj => {
    return obj.title === 'newTitleForBlogTestTwo'
  })

  expect(response.body).toHaveLength(initialBlogs.length +1)
  expect(contents.likes).toBe(0)
})
afterAll(() => {
  mongoose.connection.close()
})
