const ContactsService = ($http, API_URL) => {
    'ngInject'

    let contacts = []

    const getContacts = () => {
        return $http.get(`${API_URL}/api/contacts`, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
            .then((response) => {
                contacts = response.data

                return contacts
            })
            .catch((err) => {
                console.error('Error occured while retrieving contacts', err)
            })
    }

    const getContact = (contactId) => {
        return $http.get(`${API_URL}/api/contacts/${contactId}`, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
            .then(response => response.data)
    }

    const createContact = (contact) => {
        return $http.post(`${API_URL}/api/contacts`, contact, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
            .then((response) => {
                const newContact = response.data

                contacts.unshift(newContact)
            })
            .catch((err) => {
                console.error('Error occured while creating contact', err)
            })
    }

    const editContact = (contactId, params) => {
        return $http.put(`${API_URL}/api/contacts/${contactId}`, params, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
            .then(() => {
                contacts = contacts.map((item) => {
                    if (item._id === contactId) {
                        const newItem = Object.assign(item, params)

                        return newItem
                    }

                    return item
                })
            })
            .catch((err) => {
                console.error('Error occured while editing contact', err)
            })
    }

    const removeContact = (contactId) => {
        return $http.delete(`${API_URL}/api/contacts/${contactId}`, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
            .then(() => {
                contacts = contacts.filter(item => item._id !== contactId)

                return contacts
            })
            .catch((err) => {
                console.error('Error occured while removing contact', err)
            })
    }

    return {
        contacts,
        getContacts,
        getContact,
        createContact,
        editContact,
        removeContact
    }
}

export default ContactsService
