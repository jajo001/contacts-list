class NavbarController {
    constructor ($location, UserService) {
        'ngInject'

        this.name = 'navbar'
        this.userService = UserService
        this.$location = $location
    }

    $onInit () {
        try {
            this.user = JSON.parse(localStorage.getItem('user'))
        } catch (err) {
            console.error('Can\'t parse user', err)
        }
    }

    logOut () {
        this.userService.logOut()
        this.$location.path('/login')
    }
}

export default NavbarController
