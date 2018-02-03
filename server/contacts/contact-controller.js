const Contact = require('./contact-model')
const { handleErrors } = require('../errors')

const getContacts = (req, res) => {
    Contact.find({ user: req.user._id })
        .sort({
            createdAt: 'desc'
        })
        .then((data) => {
            res.json(data)
        })
        .catch(err => handleErrors(res, err))
}

const getContact = (req, res) => {
    Contact.findOne({ user: req.user._id, _id: req.params.contactId })
        .sort({
            createdAt: 'desc'
        })
        .then((data) => {
            res.json(data)
        })
        .catch(err => handleErrors(res, err))
}

const createContact = (req, res) => {
    const user = req.user._id
    const { name, surname, phone } = req.body

    if (!name || !surname || !phone) {
        return res.status(400).send('Fill all required fields!')
    }

    new Contact({ user, name, surname, phone }).save()
        .then((data) => {
            res.json(data)
        })
        .catch(err => handleErrors(res, err))

}

const updateContact = (req, res) => {
    const _id = req.params.id
    const user = req.user._id
    const params = req.body

    Contact.update({ _id, user }, { $set: params })
        .then(() => {
            res.status(200).send('Contact successfully updated')
        })
        .catch(err => handleErrors(res, err))
}

const deleteContact = (req, res) => {
    const _id = req.params.id
    const user = req.user._id

    Contact.remove({ _id, user })
        .then(() => {
            res.status(200).send('Contact removed successfully')
        })
        .catch(err => handleErrors(res, err))
}

const searchContacts = (req, res) => {
    const user = req.user._id

    let search = req.query.q || ''

    search = decodeURI(search)

    if (!search) {
        return res.json([])
    }

    Contact.find({
        $or: [
            { name: { $regex: '.*' + search + '.*' } },
            { surname: { $regex: '.*' + search + '.*' } },
            { phone: { $regex: '.*' + search + '.*' } }
        ],
        user
    })
        .sort({
            createdAt: 'desc'
        })
        .then((data) => {
            res.json(data)
        })
        .catch(err => handleErrors(res, err))
}

module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact,
    searchContacts
}
