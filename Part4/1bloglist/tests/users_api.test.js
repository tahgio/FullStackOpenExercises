const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const init = require('./test_helper')
const Users = require('../models/user')

beforeEach(async () => {
    await Users.deleteMany({})
    await Users.insertMany(init.users)
}, 100000)
describe('creating users', ()=> {
test('creation fails w status if username exists', async () => {
    const startUsers = await init.usersInDb()

    const newUser = {
        username: 'jubileu',
        name: "Teste da Silva",
        password: "gfdssasdf"
    }

    const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')
})

test('username is required', async ()=> {
    const startUsers = await init.usersInDb()

    const newUser = {
        name: "Teste da Silva",
        password: "gfdssasdf"
    }

    const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('User validation failed:')
})

test('username has to be ate least 3 characters-long', async ()=> {
    const startUsers = await init.usersInDb()

    const newUser = {
        username: "t",
        name: "Teste da Silva",
        password: "gfghfd"
    }

    const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('is shorter than the minimum allowed length')
})

test('password is required', async ()=> {
    const startUsers = await init.usersInDb()

    const newUser = {
        username: "test",
        name: "Teste da Silva",
    }

    const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username without password')
})

test('password has to be ate least 3 characters-long', async ()=> {
    const startUsers = await init.usersInDb()

    const newUser = {
        username: "test",
        name: "Teste da Silva",
        password: "gf"
    }

    const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password is too short')
})



})







afterAll(() => {
    mongoose.connection.close()
})