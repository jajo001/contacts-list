class ForgotController {
    constructor ($location, UserService) {
        'ngInject'

        this.name = 'forgot'
        this.userService = UserService
        this.$location = $location
    }

    forgot () {
        this.userService.forgot(this.email)
            .then((response) => {
                this.error = null
                this.email = null
                this.success = response.data
            })
            .catch((err) => {
                this.success = null
                this.error = err.data
            })
    }
}

export default ForgotController
