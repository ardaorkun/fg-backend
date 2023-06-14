const mongoose = require('mongoose')

const comment = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postID : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    content: {
        type: String,
        required: [true, 'Please provide a content.']
    }
}, { timestamps: true })

module.exports = mongoose.model('Comment', comment)