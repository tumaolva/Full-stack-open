const blogsRouter = require('express').Router()
require('express')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})


blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const user = await User.findById(body.userId)
  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  const blog = new Blog({
    ...body,
    user: user._id, // liitetään blogi käyttäjään
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
    
  response.status(201).json(savedBlog)
    .catch(error => next(error))
})

blogsRouter.delete('/:id', async (request, response, next) => {
  await Blog.findByIdAndDelete(request.params.id)
  console.log('blogi poistettu')
  response.status(204).end()
    .catch(error => next(error))
})
  
module.exports = blogsRouter