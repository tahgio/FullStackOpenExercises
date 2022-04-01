const mongoose = require('mongoose')

const schema = mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  blog: {
    type: String,
    required: true,
  }
})

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Comment', schema)