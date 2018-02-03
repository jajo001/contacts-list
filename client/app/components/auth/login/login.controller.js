class LoginController {
    constructor ($location, UserService) {
        'ngInject'

        this.$location = $location
        this.userService = UserService
        this.user = {}
    }

    $onInit () {
        this.userService.isLoggedIn()
            .then((response) => {
                if (response.data.status === true) {
                    this.$location.path('/contacts')
                }
            })
            .catch(() => {
                this.$location.path('/login')
            })
    }

    logIn () {
        const { email, password } = this.user

        this.userService.logIn({ email, password })
            .then((response) => {
                const { user, token } = response.data

                localStorage.setItem('user', JSON.stringify(user))
                localStorage.setItem('token', token)

                this.$location.path('/contacts')
            })
            .catch((err) => {
                this.error = err.data
            })
    }
}

export default LoginController
