const express = require('express')
const router = express.Router()
const { register, login, getUser } = require('../controller/user')
const validateToken = require('../middleware/validateToken')

router.post('/register', register)   //@desc For users to register.
router.post('/login', login)   //@desc For users to login.

router.get('/get/:id', validateToken, getUser)   //@desc For users to get an user.

module.exports = router