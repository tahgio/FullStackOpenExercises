const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: { 
      type: String,
      required: true,
      minlength: 3
    },
    author: String,
    url: {
      type: String,
      required: true
    },
    likes: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  })

blogSchema.set('toJSON', {
    transform: (doc, obj) => {
      obj.id = obj._id.toString()
      delete obj._id
      delete obj.__v
    }
  })

module.exports = mongoose.model('Blog', blogSchema)