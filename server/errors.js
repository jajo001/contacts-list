const handleErrors = (res, err) => {
    let {
        message,
        statusCode
    } = err

    message = message || 'Server error occured, try again later'
    statusCode = statusCode || 500

    return res.status(statusCode).send(message)
}

module.exports = {
    handleErrors
}
