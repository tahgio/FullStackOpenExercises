const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req,res) => {
    const {username, password} = req.body

    const user = await User.findOne({username})
    const approved = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

    if(!(user && approved)) {
        return res.status(401).json({
            error: 'not valid username or password'
        })
    }

    const forToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(
        forToken,
        process.env.SECRET,
        { expiresIn: 60*60 }
        )

    res.status(200)
    .send({ token, username: user.username, name: user.name })

})

module.exports = loginRouter