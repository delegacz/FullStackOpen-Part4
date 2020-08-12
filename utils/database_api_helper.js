const Blog = require('../models/blog')


blogsInDatabse = async () => {
    let blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    blogsInDatabse
}