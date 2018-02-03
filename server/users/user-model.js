const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const { Schema } = mongoose

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true
    },
    resetToken: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) {
            return callback(err)
        }

        callback(null, isMatch)
    })
}

userSchema.pre('save', function (next) {
    const user = this

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err)
        }

        bcrypt.hash(user.password, salt, (error, hash) => {
            if (error) {
                return next(error)
            }

            user.password = hash
            next()
        })
    })
})

userSchema.pre('update', function () {
    this.update({}, {
        $set: {
            updatedAt: new Date()
        }
    })
})

const User = mongoose.model('User', userSchema)

module.exports = User
