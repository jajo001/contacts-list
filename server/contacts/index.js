const { Router } = require('express')

const {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact,
    searchContacts
} = require('./contact-controller')

const { requireAuth } = require('../auth/auth-permissions')

const router = Router()

router.get('/contacts', requireAuth, getContacts)
router.get('/contacts/:contactId', requireAuth, getContact)
router.post('/contacts', requireAuth, createContact)
router.put('/contacts/:id', requireAuth, updateContact)
router.delete('/contacts/:id', requireAuth, deleteContact)
router.get('/contacts/search', requireAuth, searchContacts)

module.exports = router
