import angular from 'angular'
import uiRouter from 'angular-ui-router'

import SignupComponent from './signup.component'
import SignUpService from './signup.service'

const signupModule = angular.module('signup', [
    uiRouter
])

    .config(($stateProvider, $urlRouterProvider) => {
        'ngInject'

        $urlRouterProvider.otherwise('/')

        $stateProvider
            .state('signup', {
                url: '/signup',
                component: 'signup'
            })
    })

    .component('signup', SignupComponent)

    .service('SignUpService', SignUpService)

    .name

export default signupModule
