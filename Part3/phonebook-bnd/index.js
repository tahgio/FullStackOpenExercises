require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Persons = require('./models/phonedb')
const app = express()
app.use(cors())
app.use(express.static('build'))
app.use(express.json())

morgan.token('post', (req,) => {
  if (JSON.stringify(req.body).length <= 2) {
    return ''
  }
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'))
app.get('/', (req, res) => {
  res.send('<h1>Olá</h1>')
})

app.get('/api/persons', (req, res) => {
  Persons.find({}).then(e => {
    res.json(e)
  })
})


app.get('/api/persons/:id', (req,res, next) => {
  Persons.findById(req.params.id)
    .then(e => {
      if (e) {
        res.json(e)
      } else {
        res.status(404).end()
      }
    })
    .catch(err => { next(err)
    })
})

app.get('/info', (req, res) => {
  let date = new Date()
  Persons.find({}).then( e =>
    res.send(`
              <p>Phonebook has info for ${e.length} people</p> 
               <p>${date}</p>    
        `)
  )
})


app.post('/api/persons', (req, res, next) => {
  const body = req.body
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number is missing'
    }) }

  const per = new Persons ({
    name: body.name,
    number: body.number
  })
  per.save().then(svdper => {
    res.json(svdper)
  })
    .catch(err => next(err))
})


app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body

  Persons.findByIdAndUpdate(
    req.params.id,
    { name, number }, { new: true, runValidators: true, context: 'query' })
    .then(updtper => {
      res.json(updtper)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Persons.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(err => next(err))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (err, req, res, next) => {
  console.error(err.message)

  if (err.name === 'CastError') {
    return res.status(400).send({ err: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ err: err.message })
  }
  next(err)
}
app.use(errorHandler)
// eslint-disable-next-line no-undef
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})