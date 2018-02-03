import angular from 'angular'
import uiRouter from 'angular-ui-router'

import LoginComponent from './login.component'

const loginModule = angular.module('login', [
    uiRouter
])

    .config(($stateProvider, $urlRouterProvider) => {
        'ngInject'

        $urlRouterProvider.otherwise('/')

        $stateProvider
            .state('login', {
                url: '/',
                component: 'login'
            })
    })

    .component('login', LoginComponent)

    .name

export default loginModule
