const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const { connectDB } = require('./config/database')
const user = require('./route/user')
const admin = require('./route/admin')
const post = require('./route/post')
const game = require('./route/game')
const errorHandler = require('./middleware/errorHandler')

const app = express()
app.use(cors())
const port = process.env.PORT

connectDB()

app.use(express.json())
app.use('/api/user', user)
app.use('/api/admin', admin)
app.use('/api/post', post)
app.use('/api/game', game)
app.use('*', (req, res) => {res.status(404).json({ message: 'URL not found.' })})
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`)
})