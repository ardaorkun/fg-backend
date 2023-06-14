const jwt = require('jsonwebtoken')

const validateToken = async (req, res, next) => {
    try {
        let token
        let authHeader = req.headers.Authorization || req.headers.authorization
        if (authHeader && authHeader.startsWith('Bearer')) {
            token = authHeader.split(' ')[1]
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    const error = new Error('User is not authorized.')
                    error.statusCode = 401
                    throw error
                }
                req.user = decoded.user
                next()
            })
            if (!token) {
                const error = new Error('User is not authorized or the token is missing.')
                error.statusCode = 401
                throw error
            }
        } else {
            const error = new Error('User is not authorized or the token is missing.')
            error.statusCode = 401
            throw error
        }
    } catch (error) {
        next(error)
    }
}

module.exports = validateToken