const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
    
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })
  if (password.length < 3) {
    return response.status(400).json({
      error: 'Salasanan on oltava vähintään 3 merkkiä pitkä'
    })
  }
  if (username.length < 3) {
    return response.status(400).json({
      error: 'Käyttäjätunnuksen on oltava vähintään 3 merkkiä pitkä'
    })
  }

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter