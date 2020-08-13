const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const { response, request } = require('express')
const blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
blogRouter.post('/', (request, response) => {
      let data = request.body
      if( data.title === undefined || data.url === undefined ) {
        response.status(400).end()
      }
      else {

      const blog = new Blog({
          title: request.body.title,
          author: request.body.author,
          url: request.body.url,
          likes: request.body.likes === undefined ? 0 : request.body.likes
      })

    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
      }
  })
blogRouter.get('/:id', async (request, response, next) => {
  try{
    let blog = await Blog.findById(request.params.id)
    return response.json(blog)
  }
  catch(error) { next(error) }
})

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    let blogToBeRemoved = await Blog.findById(request.params.id)
    await blogToBeRemoved.remove()
    response.status(204).end()
  }
  catch(error) { next(error) }
})

blogRouter.put('/:id', async (request, response, next) => {
  
  const newlikes = await (request.body.likes) + 1

  try{

    let blog = await Blog.findByIdAndUpdate(request.params.id, {likes: newlikes})
    response.json(blog).end()

  }
  catch(error) { next(error) }
})


  module.exports = blogRouter