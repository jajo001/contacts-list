class ResetController {
    constructor ($location, $stateParams, $timeout, UserService) {
        'ngInject'

        this.name = 'forgot'
        this.$location = $location
        this.$stateParams = $stateParams
        this.$timeout = $timeout
        this.userService = UserService
    }

    // TODO validate reset token
    // $onInit () {
    //     this.userService.checkResetToken()
    // }

    reset () {
        const { newPassword, reNewPassword } = this

        if (newPassword !== reNewPassword) {
            this.error = 'Passwords do not match'

            return
        }

        const { resetToken } = this.$stateParams

        this.userService.reset(resetToken, newPassword)
            .then((response) => {
                this.error = null
                this.newPassword = null
                this.reNewPassword = null
                this.success = response.data

                this.$timeout(() => {
                    this.$location.path('/login')
                }, 2000)
            })
            .catch((err) => {
                this.success = null
                this.error = err.data
            })
    }
}

export default ResetController
