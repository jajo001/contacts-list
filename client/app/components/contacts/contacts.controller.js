class ContactsController {
    constructor ($location, UserService, ContactsService) {
        'ngInject'

        this.$location = $location
        this.userService = UserService
        this.contactsService = ContactsService
        this.contacts = ContactsService.contacts
    }

    $onInit () {
        this.userService.isLoggedIn()
            .then((response) => {
                if (!response.data.status) {
                    this.$location.path('/login')
                }
            })
            .catch(() => {
                this.$location.path('/login')
            })

        this.contactsService.getContacts().then((contacts) => { this.contacts = contacts })
    }

    removeContact (contactId) {
        this.contactsService.removeContact(contactId).then((contacts) => { this.contacts = contacts })
    }
}

export default ContactsController
