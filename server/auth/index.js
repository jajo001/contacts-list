const { Router } = require('express')
const { requireAuth, requireLogin } = require('./auth-permissions')
const {
    checkStatus,
    logIn,
    forgotPassword,
    resetPassword
} = require('./auth-controller')

const router = Router()

router.get('/status', requireAuth, checkStatus)
router.post('/login', requireLogin, logIn)
router.post('/forgot', forgotPassword)
router.post('/reset/:resetToken', resetPassword)

module.exports = router
