const { UserInputError, AuthenticationError } = require('apollo-server')

const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const JWT_SECRET = 'ARROZ_COM_FEIJAO'

const Books = require('./models/book')
const Authors = require('./models/author')
const User = require('./models/user')

const resolvers = {
  Query: {
    bookCount: async () => Books.collection.countDocuments(),
    authorCount: async () => Authors.collection.countDocuments(),
    allBooks: async (root, args) => {
      let books = await Books.find({}).populate('author')
      let author = await Authors.findOne({name: args.author})
      if (!args.author && !args.genre) {
        return books
      } else if (args.author && !args.genre) {
        let aFlt = await Books.find({author: author._id}).populate('author')
        return aFlt
      } else if (args.genre && !args.author) {
        let gFlt = await Books.find({genres: {$in: [args.genre]}}).populate('author')
        return gFlt
      } else if (args.genre && args.author) {
        let agFlt = await Books.find({author: author._id, genres: {$in: [args.genre]}}).populate('author')
        return agFlt
    }
  },
    allAuthors: async () => Authors.find({}),
    me: (r,a,context) => {
      return context.currentUser
    },
  },
    

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      let authors = await Authors.find({}) 
      let singleA = authors.find(e => e.name === args.author)
      if (singleA) {
        let book = new Books ({...args, author: singleA._id})
        pubsub.publish('BOOK_ADDED', {bookAdded: book})
        return book.save().catch( error => {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        })
      } else {
        let author = new Authors ({name: args.author})
        let single = await author.save()
        let book = new Books ({ ...args, author: single._id})
        pubsub.publish('BOOK_ADDED', {bookAdded: book})
        return book.save().catch( error => {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        })
      }
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      let author = await Authors.findOne({name: args.name})
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      try { 
        await author.save() 
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch( error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'jacaleh') {
        throw new UserInputError("wrong credentials")
      }

      const uFToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(uFToken, JWT_SECRET)}

    }

  }, 

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  },
  
  

  Author: {
    bookCount: async (root) => {
      let bookcnt = (await Books.find({author: root._id})).length
      return bookcnt
    },  
  },

  Book: {
    author: async (root) => {
      return (await root.populate('author')).author
    }
  }
}

module.exports = resolvers