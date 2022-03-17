const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

//module imports
const {info, error} = require('./utils/logger')
const {MDB_URI, PORT} = require('./utils/config')
const Blog = require('./models/blogs')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middle = require('./utils/middleware')

mongoose.connect(MDB_URI)


app.use(cors())
app.use(express.json())
//app.use(middle.tokenExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.get('/', (req,res) => {
  res.send('<h1>HELLO_WORLD</h1>')
})


app.use(middle.unknownEndpoint)
app.use(middle.errorHandler)
module.exports = app