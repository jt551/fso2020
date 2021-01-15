const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map((blog) => blog.toJSON()))
})

blogRouter.post('/', async (request, response) => {
  if (!request.body.likes) request.body.likes = 0
  if (!request.body.title && !request.body.url)
    return response.status(400).send('title & url missing')
  const blog = new Blog(request.body)
  await blog.save().then((result) => {
    response.status(201).json(result)
  })
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new : true })
  response.json(updatedBlog)
})

module.exports = blogRouter
