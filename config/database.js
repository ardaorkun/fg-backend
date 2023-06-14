const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING)
        console.log('Successfully connected to the database...')
    } catch (error) {
        console.log('Could not connect to the database...')
        process.exit(1)
    }
}

module.exports = { connectDB }