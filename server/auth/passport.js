const passport = require('passport')
const { ExtractJwt, Strategy } = require('passport-jwt')
const LocalStrategy = require('passport-local')

const User = require('../users/user-model')

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.JWT_SECRET
}

const jwtLogin = new Strategy(jwtOptions, (payload, done) => {
    User.findById(payload.sub, (err, user) => {
        if (err) {
            return done(err, false)
        }

        if (user) {
            // console.log(payload.exp, Date.now(), Date.now() - payload.exp)
            if (!payload.exp || (payload.exp <= Date.now())) {
                done(null, false, {
                    message: 'Expired Token'
                })
            } else {
                done(null, user)
            }
        } else {
            done(null, false)
        }
    })
})

const localOptions = {
    usernameField: 'email'
}

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
    User.findOne({ email }, (err, user) => {
        if (err) {
            return done(err, false)
        }

        if (!user) {
            return done(null, false)
        }

        user.comparePassword(password, (error, isMatch) => {
            if (error) {
                return done(error, false)
            }

            if (!isMatch) {
                return done(null, false)
            }

            return done(null, user)
        })
    })
})

passport.use(jwtLogin)
passport.use(localLogin)
