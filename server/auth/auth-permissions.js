const passport = require('passport')

const User = require('../users/user-model')

const requireAuth = passport.authenticate('jwt', {
    session: false
})

const requireLogin = passport.authenticate('local', {
    session: false
})

module.exports = {
    requireAuth,
    requireLogin,
}
