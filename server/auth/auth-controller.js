const jwt = require('jwt-simple')
const uuidv1 = require('uuid/v1')

const { handleErrors } = require('../errors')
const { sendEmail } = require('./auth-service')

const User = require('../users/user-model')

const _tokenizeUser = (user) => {
    const sub = user._id
    const iat = Date.now()
    const exp = Date.now() + (60 * 60 * 1000)

    return jwt.encode({
        sub,
        iat,
        exp
    }, process.env.JWT_SECRET)
}

const checkStatus = (req, res) => {
    const authenticated = req.isAuthenticated()

    res.json({ status: authenticated })
}

const logIn = (req, res) => {
    const { email } = req.body

    User.findOne({ email })
        .then((data) => {
            const token = _tokenizeUser(data)

            const user = {
                email: data.email,
                fullName: data.fullName
            }

            res.json({
                token,
                user
            })
        })
        .catch(err => handleErrors(res, err))
}

const forgotPassword = (req, res) => {
    const { email } = req.body

    let resetToken

    User.findOne({ email })
        .then((user) => {
            if (!user) {
                const error = new Error('User not found with this email!')
                error.status = 404

                throw error
            }

            resetToken = uuidv1()

            return User.update({ _id: user._id }, { $set: { resetToken } })
        })
        .then(() => {
            const url = `http://localhost:3000/reset/${resetToken}`

            return sendEmail(email, url)
        })
        .then(() => {
            res.status(200).send('Check your email address')
        })
        .catch(err => handleErrors(res, err))
}

const resetPassword = (req, res) => {
    const { resetToken } = req.params
    const { newPassword } = req.body

    User.findOne({ resetToken })
        .then((user) => {
            if (!user) {
                const error = new Error('Reset token invalid!')
                error.status = 404

                throw error
            }

            const newUser = user
            newUser.password = newPassword
            newUser.resetToken = null

            return newUser.save()
        })
        .then(() => {
            res.status(200).send('Password updated successfully')
        })
        .catch(err => handleErrors(res, err))
}


module.exports = {
    checkStatus,
    logIn,
    forgotPassword,
    resetPassword
}
