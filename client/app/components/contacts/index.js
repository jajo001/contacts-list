import angular from 'angular'
import uiRouter from 'angular-ui-router'

import ContactsComponent from './contacts.component'
import NewContactComponent from './new-contact/new-contact.component'
import EditContactComponent from './edit-contact/edit-contact.component'
import ContactsService from './contacts.service'

const contactsModule = angular.module('contacts', [
    uiRouter
])

    .config(($stateProvider, $urlRouterProvider) => {
        'ngInject'

        $urlRouterProvider.otherwise('/')

        $stateProvider
            .state('contacts', {
                url: '/contacts',
                component: 'contacts'
            })
            .state('contacts.new', {
                url: '/new',
                component: 'newContact'
            })
            .state('contacts.edit', {
                url: '/:contactId',
                component: 'editContact'
            })
    })

    .component('contacts', ContactsComponent)

    .component('newContact', NewContactComponent)

    .component('editContact', EditContactComponent)

    .service('ContactsService', ContactsService)

    .name

export default contactsModule
