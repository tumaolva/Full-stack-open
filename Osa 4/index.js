const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
  })


// vanha tiedosto alhaalla

//
// const express = require('express')
// const mongoose = require('mongoose')

// const app = express()                               app.js 

// const blogSchema = mongoose.Schema({                models/blog.js
//   title: String,
//   author: String,
//   url: String,
//   likes: Number,
// })

// const Blog = mongoose.model('Blog', blogSchema)     models/blog.js

// const mongoUrl = 'mongodb://localhost/bloglist'     utils/config.js salasana piilotettu .env sisään ja käytetään MONGODB_URI muuttujaa
// mongoose.connect(mongoUrl)

// app.use(express.json())                             app.js

// app.get('/api/blogs', (request, response) => {      controllers/blogs.js
//   Blog.find({}).then((blogs) => {
//     response.json(blogs)
//   })
// })

// app.post('/api/blogs', (request, response) => {     controllers/blogs.js
//   const blog = new Blog(request.body)

//   blog.save().then((result) => {
//     response.status(201).json(result)
//   })
// })

// const PORT = 3003                                    utils/config.js piilotettu .env sisään ja käytetään PORT muuttujaa
// app.listen(PORT, () => { 
//   console.log(`Server running on port ${PORT}`)      console.log poistettu käytöstä ja käytetään logger.js tiedostosta löytyviä funktioita
// })