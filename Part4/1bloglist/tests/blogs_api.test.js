const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const init = require('./test_helper')
const Blogs = require('../models/blogs')

beforeEach(async () => {
    await Blogs.deleteMany({})
    await Blogs.insertMany(init.blogs)
}, 100000)

test('notes are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 100000)

test('all notes are returned', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body).toHaveLength(init.blogs.length)
})

test('a valid entry can be added to the list', async () => {
    const newBEntry =  {
        title: "Blog sobre blogs",
        author: "Josias Beridineu",
        url: "https://josiaseseusblogs.com/",
        likes: 26,
      }

    await api
        .post('/api/blogs')
        .send(newBEntry)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const res = await init.entriesInDb()
    expect(res).toHaveLength(init.blogs.length + 1)

    const titles = res.map(e => e.title)  
    expect(titles).toContain('Blog sobre blogs')

}, 100000)

test('an entry without url and title is not added', async () => {
    const newBEntry =  {
        author: "Josias Beridineu"
    }

    await api
      .post('/api/blogs')
      .send(newBEntry)
      .expect(400)

    const notChanged = await init.entriesInDb()
    expect(notChanged).toHaveLength(init.blogs.length)
})

test('an entry without likes return likes as 0', async () => {
    
    const newBEntry =  {
        title: "Blog sobre blogs",
        author: "Josias Beridineu",
        url: "https://josiaseseusblogs.com/"
    }

    await api
        .post('/api/blogs')
        .send(newBEntry)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const res = await init.entriesInDb()
    expect(res).toHaveLength(init.blogs.length + 1)

    const entry = res.find(e => e.title === "Blog sobre blogs")
    expect(entry.likes).toEqual(0)
    
    
})


test('an entry has a defined id', async ()=> {
    const startList = await init.entriesInDb()
    const entry = startList[0]

    expect(entry.id).toBeDefined()
})

test('succesfull get request for blog id', async() => {
    const startList = await init.entriesInDb()
    const specific = startList[0]

    const resList = await api
        .get(`/api/blogs/${specific.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    const processed = JSON.parse(JSON.stringify(specific))
    
    expect(resList.body).toEqual(processed)
})

test('a note can be deleted', async () => {
   const startList = await init.entriesInDb()
   const toDel = startList[0]

   await api
    .delete(`/api/blogs/${toDel.id}`)
    .expect(204)
   
   const finalList = await init.entriesInDb()
   expect(finalList).toHaveLength(init.blogs.length - 1) 
}, 100000)

test('a note can be updated', async () => {
    const startList = await init.entriesInDb()
    const toUp = startList[0]

    const Update =  {
        likes: 76,
      }

    await api
        .put(`/api/blogs/${toUp.id}`)
        .send(Update)
        .expect(200)
    const finalList = await init.entriesInDb()
    const entry = finalList.find(e => e.author === toUp.author)
    expect(entry.likes).toEqual(76)
})

afterAll(() => {
    mongoose.connection.close()
})