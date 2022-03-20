const router = require('express').Router()
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')

router.get('/', async (request, response) => {
  const notes = await Blog
    .find({})
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(notes)
})

router.post('/', async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const body = request.body
  const user = request.user
 if (!body.likes) {
   body.likes = 1
 }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 1,
    user: user._id
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

router.delete('/:id', async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id)
  if (!blogToDelete ) {
    return response.status(204).end()
  }

  // if ( blogToDelete.user && blogToDelete.user.toString() !== request.user.id ) {
  //   return response.status(401).json({
  //     error: 'only the creator can delete a blog'
  //   })
  // }

  await Blog.findByIdAndRemove(request.params.id)

  return response.status(204).end()
})

router.get('/:id', async (req, res) => {
  const blist = await Blog.findById(req.params.id)
  if (blist) {
    res.json(blist.toJSON())
  } else {
    res.status(404).end()
  }
})

router.put('/:id', async (request, response) => {
  const blog = request.body

  const updatedBlog = await Blog
    .findByIdAndUpdate(
      request.params.id, 
      blog, 
      { new: true, runValidators: true, context: 'query' }
    )
      
  response.json(updatedBlog)
})

module.exports = router