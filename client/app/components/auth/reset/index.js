import angular from 'angular'
import uiRouter from 'angular-ui-router'

import ResetComponent from './reset.component'

const resetModule = angular.module('reset', [
    uiRouter
])

    .config(($stateProvider, $urlRouterProvider) => {
        'ngInject'

        $urlRouterProvider.otherwise('/')

        $stateProvider
            .state('reset', {
                url: '/reset/:resetToken',
                component: 'reset'
            })
    })

    .component('reset', ResetComponent)

    .name

export default resetModule
