const admin = async (req, res, next) => {
    try {
        const role = req.user.role
        if (role === 3) {
            next()
        } else {
            const error = new Error('You are not an admin.')
            error.statusCode = 401
            throw error
        }
    } catch (error) {
        next(error)
    }
}

module.exports = admin