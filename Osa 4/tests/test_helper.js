const Blog = require('../models/blog')

const initialBlogs = [
  {
    id: '1',
    title: 'hello world',
    author: 'mika häkkinen',
    url: 'www.hello.com',
    likes: 12,
  },
  {
    id: '2',
    title: 'hello world2',
    author: 'mika häkkinen',
    url: 'www.hello.com',
    likes: 12,
  },
  {
    id: '3',
    title: 'hello world3',
    author: 'mika häkkinen',
    url: 'www.hello.com',
    likes: 12,
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}