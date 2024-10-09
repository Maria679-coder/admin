const mongoose = require('mongoose')

const authSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required field']
    },
    LastName: {
        type: String,
        required: [true, 'Last name is required field']
    },
    Email: {
        type: String,
        required: [true, 'email is required field']
    },
    Password: {
        type: String,
        required: [true, 'password is required filed'],
        minLength: [8, 'password must be at least Nine characters']
    },
    Products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }]

})

const authModel = mongoose.model('auth', authSchema)

module.exports = authModel