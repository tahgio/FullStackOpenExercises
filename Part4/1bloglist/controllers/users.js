const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
    const users = await User
    .find({}).populate('blogs', {title: 1, likes: 1})
    res.json(users)
})

usersRouter.post('/', async (req, res) => {
    const { username, name, password } = req.body
    if (!password) {
        return res.status(400)
        .json({error: "username without password"})
        .end()
    }
    if (password.length < 3) {
        return res.status(400)
        .json({error: "password is too short"})
        .end()
    }

    const existing = await User.findOne({username})
    if(existing) {
        return res.status(400)
        .json({
            error: "username must be unique"
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const svd = await user.save()
    res.status(201).json(svd)
})

module.exports = usersRouter