const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blog')

describe('when there is initially some blogs in database', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[2])
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
      const contents = response.body.map((r) => r.title)

      expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
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
      const contents = response.body.find((obj) => {
        return obj.title === 'newTitleForBlogTestTwo'
      })

      expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
      expect(contents.likes).toBe(0)
    })

    test('new blog post request without title and url results to bad request response (400)', async () => {
      const newBlog = {
        author: 'testAuthorTwo',
        likes: 8,
      }

      await api.post('/api/blogs').send(newBlog).expect(400)

      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
  })
  describe('deleting a Blog', () => {
    test('delete request is succeeds with valid id', async () => {
      const initialResponse = await helper.blogsInDb()
      await api
        .delete(`/api/blogs/${initialResponse[0].id}`)
        .expect(204)
      const finalResponse = await helper.blogsInDb()
      expect(finalResponse).toHaveLength(initialResponse.length - 1)
    })
  })
  afterAll(() => {
    mongoose.connection.close()
  })
})
