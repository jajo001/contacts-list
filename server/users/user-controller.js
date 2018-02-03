const User = require('./user-model')
const { handleErrors } = require('../errors')


const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return re.test(String(email).toLowerCase())
}

const signUp = (req, res) => {
    const { email, password, fullName } = req.body

    if (!validateEmail(email)) {
        return res.status(400).send('Email address not valid!')
    }

    if (!fullName || !email || !password) {
        return res.status(400).send('Fill all required fields!')
    }

    User.count({ email })
        .then((count) => {
            if (count > 0) {
                const error = new Error('User already exists!')
                error.status = 422

                throw error
            }

            return new User({ email, password, fullName }).save()
        })
        .then(() => {
            res.status(200).send('You have successfully registered')
        })
        .catch(err => handleErrors(res, err))
}

module.exports = {
    signUp
}
