const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

module.exports = app