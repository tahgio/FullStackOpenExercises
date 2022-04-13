require('dotenv').config()

const MDB_URI = process.env === 'test'
? process.env.TEST_MDB_URI
: process.env.MDB_URI

module.exports = { MDB_URI }