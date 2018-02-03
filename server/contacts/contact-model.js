const mongoose = require('mongoose')

const { Schema } = mongoose

const contactSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
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

contactSchema.pre('update', function () {
    this.update({}, {
        $set: {
            updatedAt: new Date()
        }
    })
})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact
