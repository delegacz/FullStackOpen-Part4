const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
const userSchema = mongoose.Schema({
    username: {
        type: String,
        minlength: [3, 'Username must be at least 3 characters long'],
        unique: true,
        required: true
    },
    name: String,
    password: String,
})


userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('User',userSchema)