/* eslint-disable no-undef */
const mongoose = require('mongoose')

const url = process.env.MDB_URI
console.log('connecting to mongodb+srv://FSOex:***')

mongoose.connect(url)
  .then(() => {console.log('connected to MongoDB')})
  .catch((err) => {
    console.log('impossible to connect', err.message)
  })

const perSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'Name should be at least 3 characters long'],
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: (v) => {
        return /^\d{2,3}-\d{6,}/.test(v)
      },
      message: props => `${props.value} is not valid`
    },
    required: [true, 'Phone number required']
  }
})

perSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id.toString()
    delete obj._id
    delete obj.__v
  }
})


module.exports = mongoose.model('Person', perSchema)