const logger = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
  }
  
const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
      return response.status(401).json({error: 'not valid token'})
    } else if (error.name === 'TokenExpiredError') {
      return response.status(401).json({error: 'token expired'})
    }
  
    next(error)
  }

const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization')
  if(auth && auth.toLowerCase().startsWith('bearer ')) {
    return auth.substring(7)
  }
  return null
}

const userExtractor = (req, res, next) => {
  const token = tokenExtractor(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  const userid = decodedToken.id

  return userid
}
  
  module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
  }