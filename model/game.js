const mongoose = require('mongoose')

const game = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name.']
    },
    release_year: {
        type: Number,
        required: [true, 'Please provide a year.']
    },
    producer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

module.exports = mongoose.model('Game', game)