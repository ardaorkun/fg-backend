const User = require('../model/user')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')

//@desc REGISTER
//@route POST /api/user/register
//@access PUBLIC
const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            const error = new Error('Provide all values.')
            error.statusCode = 400
            throw error
        }
        const hashedPassword = await bcryptjs.hash(password, 10)
        const user = await User.create({ username, email, password: hashedPassword })
        res.status(201).json({ created: true })
    } catch (error) {
        next(error)
    }
}

//@desc LOGIN
//@route POST /api/user/login
//@access PUBLIC
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            const error = new Error('Provide all values.')
            error.statusCode = 400
            throw error
        }
        const user = await User.findOne({ email: email })
        if (user && (await bcryptjs.compare(password, user.password))) {
            const token = jwt.sign({
                user: {
                    username: user.username,
                    id: user.id,
                    role: user.role
                }
            }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
            res.status(200).json({ token })
        } else {
            const error = new Error('Wrong credentials.')
            error.statusCode = 401
            throw error
        }
    } catch (error) {
        next(error)
    }
}

//@desc GET AN USER
//@route GET /api/user/get/:id
//@access PRIVATE
const getUser = async (req, res, next) => {
    try {
        const userID = req.params.id
        const user = await User.findById(userID)
            .select('_id username createdAt')
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

module.exports = { register, login, getUser }