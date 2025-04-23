const assert = require('node:assert')
const { test, after, describe, beforeEach} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const { initialBlogs } = require('./test_helper')
const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})


describe('api tests', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    assert.strictEqual(response.body.length, helper.initialBlogs.length) // blogien määrä on sama kuin test_helper.js tiedostossa
  })
  
  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
  
    const contents = response.body.map(e => e.title)
    assert.strictEqual(contents.includes('hello world'), true) // hello world niminen title löytyy
  })

  test('blog has id field and not _id ', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blog => {
      assert.strictEqual(blog.id === undefined, false) // id kenttä on olemassa
      assert.strictEqual(blog._id === undefined, true) // _id kenttä ei ole olemassa
    })
  })

  test('a valid blog can be added ', async () => {

    const newBlog = {                                                   // lisättävä blogi
      title: 'hello world4',
      author: 'mika häkkinen',
      url: 'www.hello.com',
      likes: 12,
    }
      
    await api                                                           // lisätään blogi tietokantaan
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      
    const response = await api.get('/api/blogs')                        //haetaan blogit tietokannasta
      
    const contents = response.body.map(r => r.title)
      
    assert.strictEqual(response.body.length, initialBlogs.length + 1)   // blogien määrä on yksi enemmän kuin ennen
      
    assert(contents.includes('hello world4'))                           // hello world4 niminen title löytyy
  })

  test('a blog without title is not added', async () => {
    const newBlog = {
      author: 'Mika Häkkinen',
      url: 'www.hello.com',
      likes: 12,
    }
      
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400) 
      .expect('Content-Type', /application\/json/)
      
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length) // blogien määrä pysyy samana
  })
      
  test('a blog without url is not added', async () => {
    const newBlog = {
      title: 'Hello World',
      author: 'Mika Häkkinen',
      likes: 12,
    }
      
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400) 
      .expect('Content-Type', /application\/json/)
      
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length) // blogien määrä pysyy samana
  })

  test('if likes is not provided, it defaults to 0', async () => {
    const newBlog = {                                                   // lisättävä blogi
      title: 'hello world4',
      author: 'mika häkkinen',
      url: 'www.hello.com',
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, 0)        // uuden blogin likes kenttä on 0
  })
  after(async () => {
    await mongoose.connection.close()
  })
    
})
