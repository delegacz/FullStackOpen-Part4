const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const Blog = require('../models/blog')
const e = require('express')
const { response } = require('express')

const api = supertest(app)


const initialBlogs = [
    { 
        _id: "5a422a851b54a676234d17f7", 
        title: "React patterns", 
        author: "Michael Chan", 
        url: "https://reactpatterns.com/", 
        likes: 7, 
        __v: 0 }, 
    { 
        _id: "5a422aa71b54a676234d17f8", 
        title: "Go To Statement Considered Harmful", 
        author: "Edsger W. Dijkstra", 
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", 
        likes: 5, 
        __v: 0 }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()

   
})

test('Returned are 2 blogs in JSON', async () => {
 
    
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect(response => {
        response.body.length = 2
      })
})

test('Id property exists', async () => {
   let response = await api.get('/api/blogs')

   let blog = response.body.map(blog => blog.id)

   expect(blog).toBeDefined()
})

afterAll(() => {
    mongoose.connection.close()
})