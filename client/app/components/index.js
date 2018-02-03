import angular from 'angular'

import Login from './auth/login'
import Signup from './auth/signup'
import Forgot from './auth/forgot'
import Reset from './auth/reset'

import Contacts from './contacts'

const componentModule = angular.module('app.components', [
    Login,
    Signup,
    Forgot,
    Reset,
    Contacts
])

    .name

export default componentModule
