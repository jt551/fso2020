const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

describe('when there is initially some blogs in database', () => {
  beforeEach(async () => {
    const user = await User.findOne({ username: 'root' })
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initialBlogs[0])
    blogObject.userId = user._id
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[1])
    blogObject.userId = user._id
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[2])
    blogObject.userId = user._id
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
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('returned blogs have id key, not _id', async () => {
    const response = await api.get('/api/blogs')
    const content = response.body[0]
    expect(content.id).toBeDefined()
  })

  describe('adding a new Blog', () => {
    test('valid blog can be added', async () => {
      const user = await User.findOne({ username: 'root' })
      const newBlog = {
        title: 'newTitleForBlogTest',
        author: 'testAuthor',
        url: 'testUrl',
        likes: 8,
        userId: user._id,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')
      const contents = response.body.map((r) => r.title)

      expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
      expect(contents).toContain('newTitleForBlogTest')
    })

    test('if new blogs likes are not defined they are set to zero', async () => {
      const user = await User.findOne({ username: 'root' })
      const newBlog = {
        title: 'newTitleForBlogTestTwo',
        author: 'testAuthorTwo',
        url: 'testUrlTwo',
        userId: user._id,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')
      const contents = response.body.find((obj) => {
        return obj.title === 'newTitleForBlogTestTwo'
      })

      expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
      expect(contents.likes).toBe(0)
    })

    test('new blog post request without title and url results to bad request response (400)', async () => {
      const user = await User.findOne({ username: 'root' })
      const newBlog = {
        author: 'testAuthorTwo',
        likes: 8,
        userId: user._id,
      }

      await api.post('/api/blogs').send(newBlog).expect(400)

      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
  })
  describe('deleting a Blog', () => {
    test('delete request is succeeds with valid id', async () => {
      const initialResponse = await helper.blogsInDb()
      await api.delete(`/api/blogs/${initialResponse[0].id}`).expect(204)
      const finalResponse = await helper.blogsInDb()
      expect(finalResponse).toHaveLength(initialResponse.length - 1)
    })
  })
  describe('updating a Blog', () => {
    test('update request is succeeds with valid id and valid data', async () => {
      const user = await User.findOne({ username: 'root' })
      const updatedData = {
        title: 'qq22',
        author: 'qq22',
        url: 'qq22',
        likes: 98,
        userId: user._id,
      }
      const initialResponse = await helper.blogsInDb()
      const response = await api
        .put(`/api/blogs/${initialResponse[0].id}`)
        .send(updatedData)
      expect(response.body.title).toBe('qq22')
    })
  })
  afterAll(() => {
    mongoose.connection.close()
  })
})
