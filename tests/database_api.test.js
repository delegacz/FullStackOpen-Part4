const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/database_api_helper')
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

const initialLength = initialBlogs.length

beforeEach(async () => {
    await Blog.deleteMany({})
    
    for(let blog of initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})


test('Returned are 2 blogs in JSON', async () => {

    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect(response => {
        response.body.length = initialLength
      })
})

test('Id property exists', async () => {
   let response = await api.get('/api/blogs')

   let blog = response.body.map(blog => blog.id)

   expect(blog).toBeDefined()
})

describe('creating new blog', () => {
    test('should be added with correct status and content shoud match', async () => {
        newBlog =  {
            "title": "My New Test Blog Entry",
            "author": "Nani Bonifacy",
            "url": "https://fullstackopen.com/en/part4/structure_of_backend_application_introduction_to_testing#exercises-4-1-4-2",
            "likes": 12,
            "id": "5f34600e0e67dc09fd054894"
        }

        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        .expect(response => {
            response.body.length = initialLength + 1
        })
        let blogs = await helper.blogsInDatabse()
        let blogTitles = blogs.map(b => b.title)
        expect(blogTitles).toContain(newBlog.title)

    })
})
describe('if likes are missing', () => {
    test('likes equall to 0 when likes are missing from the submition', async () => {

        newBlogWithMissingLikes = {
            "title": "My New Test Blog Entry without likes",
            "author": "Nani Bonifacy",
            "url": "https://fullstackopen.com/en/part4/structure_of_backend_application_introduction_to_testing#exercises-4-1-4-2"
        }
        await api
        .post('/api/blogs')
        .send(newBlogWithMissingLikes)
        .expect(response => {
            response.body.length = initialLength + 1
        })

        let blogs = await helper.blogsInDatabse()
        let blogWithZeroLikes = blogs.filter(b => b.title === "My New Test Blog Entry without likes").map(l => l.likes)

        expect(blogWithZeroLikes[0]).toBe(0)
    })
})

describe('if required fields are missing from posted blog', () => {
    test('expect status 400 when title and url is missing', async () => {
        newBlogWithMissingKeysAndValues = {
            "author": "Nani Bonifacy",
            "likes": 12
        }

        await api
        .post('/api/blogs')
        .send(newBlogWithMissingKeysAndValues)
        .expect(400)
    })
})
afterAll(() => {
    mongoose.connection.close()
})