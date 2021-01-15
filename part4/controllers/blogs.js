const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', async (request, response) => {
  if(!request.body.likes) request.body.likes = 0
  if(!request.body.title && !request.body.url) return response.status(400).send('title & url missing')
  const blog = new Blog(request.body)
  await blog.save().then((result) => {
    response.status(201).json(result)
  })
})

blogRouter.delete('/:id', async (request, response) => {
  console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD")
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogRouter
