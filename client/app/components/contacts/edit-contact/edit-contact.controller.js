class EditContactController {
    constructor ($location, $stateParams, ContactsService) {
        'ngInject'

        this.$location = $location
        this.$stateParams = $stateParams
        this.contactsService = ContactsService
    }

    $onInit () {
        this.contactId = this.$stateParams.contactId
        this.contactsService.getContact(this.contactId)
            .then((contact) => { this.contact = contact })
            .catch((err) => { console.error('Error occured while retrieving contact', err) })
    }

    editContact () {
        const { name, surname, phone } = this.contact

        this.contactsService.editContact(this.contactId, { name, surname, phone })
            .then(() => {
                this.$location.path('/contacts')
            })
    }
}

export default EditContactController
