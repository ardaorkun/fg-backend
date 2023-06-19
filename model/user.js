const mongoose = require('mongoose')

const user = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide an username.'],
        unique: [true, 'This username is taken.']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email.'],
        unique: [true, 'This mail is taken.']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password.']
    },
    role: {
        type: Number,
        min: 1,
        max: 3,
        default: 1 // 1: User 2: Producer 3: Admin
    },
    gender: {
        type: String,
    }
}, { timestamps: true })

module.exports = mongoose.model('User', user)