import angular from 'angular'
import uiRouter from 'angular-ui-router'

import ForgotComponent from './forgot.component'

const forgotModule = angular.module('forgot', [
    uiRouter
])

    .config(($stateProvider, $urlRouterProvider) => {
        'ngInject'

        $urlRouterProvider.otherwise('/')

        $stateProvider
            .state('forgot', {
                url: '/forgot',
                component: 'forgot'
            })
    })

    .component('forgot', ForgotComponent)

    .name

export default forgotModule
