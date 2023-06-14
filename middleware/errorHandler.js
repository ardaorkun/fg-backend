const errorHandler = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500
    error.status = error.status || 'Some error occurred.'
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message
    })
}

module.exports = errorHandler