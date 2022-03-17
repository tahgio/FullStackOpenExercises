const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const note = require('../../Example/models/note')
const blogs = require('../models/blogs')
const Blog = require('../models/blogs')
const User = require('../models/user')
const middle = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
    .find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const userid = middle.userExtractor(request)
    if (!userid) {
      return response.status(401).json({error: 'token missing or invalid'})
    }

    const user = await User.findById(userid)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
    })

    const svd = await blog.save()
    user.blogs = user.blogs.concat(svd._id)
    await user.save()
    
    response.status(201).json(svd)
  })

blogsRouter.get('/:id', async (req, res) => {
  const blist = await Blog.findById(req.params.id)
  if (blist) {
    res.json(blist.toJSON())
  } else {
    res.status(404).end()
  }
})

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body
  const entry = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0, 
  }
  const updted = await Blog.findByIdAndUpdate(req.params.id, entry, {new: true})
  res.json(updted)
})

blogsRouter.delete('/:id', async (req, res) => {
  const userid = middle.userExtractor(req)
  const blog = await Blog.findById(req.params.id)

  if (blog.user.toString() !== userid.toString()) {
    return res.status(401).json({error: 'deletion must be from the same user'})
  }


  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

module.exports = blogsRouter