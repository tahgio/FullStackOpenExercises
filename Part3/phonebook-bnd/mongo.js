/* eslint-disable no-undef */
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide a password as an argument')
  process.exit(1)
}

if (process.argv.length === 4) {
  console.log('You should also provide a number')
  process.exit(1)
}

const pword = process.argv[2]
const url = `mongodb+srv://part3:${pword}@cluster0.vzylg.mongodb.net/p3ex3?retryWrites=true&w=majority`

mongoose.connect(url)

const perSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', perSchema)

if (process.argv.length === 3) {
  console.log('Phonebook:')
  Person.find({}).then(res => {
    res.forEach(e => {
      console.log(e.name, e.number)
    })
    mongoose.connection.close()
  })
}

if(process.argv.length > 4) {
  const nm = process.argv[3]
  const nb = process.argv[4]

  const entry = new Person({
    name: nm,
    number: nb
  })

  entry.save().then(res => {
    console.log(`added ${res.name} number ${res.number} to phonebook`)
    mongoose.connection.close()
  })
}



