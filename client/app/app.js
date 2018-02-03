import angular from 'angular'
import uiRouter from 'angular-ui-router'
import 'normalize.css'
import 'bootstrap/dist/css/bootstrap.css'

import Common from './common'
import Components from './components'
import AppComponent from './app.component'

import UserService from './common/user/user.service'

angular.module('app', [
    uiRouter,
    Common,
    Components
])
    .config(($locationProvider) => {
        'ngInject'

        $locationProvider.html5Mode(true).hashPrefix('!')
    })

    .component('app', AppComponent)

    .service('UserService', UserService)

    .value('API_URL', 'http://localhost:5000')
