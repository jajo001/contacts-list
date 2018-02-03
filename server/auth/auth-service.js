const nodemailer = require('nodemailer')

const smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
})

const sendEmail = (email, url) => {
    const mailOptions = {
        from: '"Contacts-List" <contactslist@gmail.com>',
        to: email,
        subject: 'Reset password',
        html: `<p>Follow link to reset your password:</p><a href=${url}>${url}</a>`
    }

    return new Promise((resolve, reject) => {
        smtpTransport.sendMail(mailOptions, (error) => {
            if (error) {
                reject(error)
            } else {
                resolve()
            }
        })
    })
}

module.exports = {
    sendEmail
}
