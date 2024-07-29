const usersRouter = require('express').Router()
const User = require('../models/user')
const bcryptjs = require('bcryptjs')


usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1 })
    response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
    const user = await User.findById(request.params.id)
    if (user) {
        response.json(user)
      } else {
        response.status(404).end()
      }
})

usersRouter.post('/', async (request, response) => {
    const body = request.body
    
    const saltRounds = 10
    const passwordHash = await bcryptjs.hash(body.password, saltRounds)
    
    const newUser = new User({
        username: body.username,
        name: body.name,
        passwordHash: passwordHash,
    })

    const savedUser = await newUser.save()
    response.status(201).json(savedUser)
})

usersRouter.put('/:id', async (request, response) => {
    const body = request.body

    const user = {
        username: body.username,
        name: body.name,
        // passwordHash: body.passwordHash,
        blogs: body.blogs
    }

    const updatedUser = await User.findByIdAndUpdate(request.params.id, user, { new: true })
    response.json(updatedUser)
})

usersRouter.delete('/:id', async (request, response) => {
    await User.findByIdAndDelete(request.params.id)
    response.status(204).end
})

module.exports = usersRouter