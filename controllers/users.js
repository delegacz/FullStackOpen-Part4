const bcrypt = require('bcrypt')
const { request, response } = require('../app')
const { model } = require('../models/blog')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async(request, response) => {

    const data = await request.body
    console.log(data)
    if(data.password.length < 3 ) {
        return response.status(400).json({error: 'passowrd must be at leasr  3 characters long'})
    } else {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(data.password, saltRounds)
        console.log(data.password.lenght)
        const user = new User({
            username: data.username,
            name: data.name,
            password: passwordHash
        })
    
        const savedUser = await user.save()
        response.json(savedUser)
    }
    
})

module.exports = userRouter