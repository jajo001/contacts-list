class NewContactController {
    constructor ($location, ContactsService) {
        'ngInject'

        this.$location = $location
        this.contactsService = ContactsService
    }

    $onInit () {
        this.contact = {}
    }

    createContact () {
        const { name, surname, phone } = this.contact

        this.contactsService.createContact({ name, surname, phone })
            .then(() => {
                this.$location.path('/contacts')
            })
    }
}

export default NewContactController
