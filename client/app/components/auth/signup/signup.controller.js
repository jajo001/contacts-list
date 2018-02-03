class SignupController {
    constructor (SignUpService) {
        'ngInject'

        this.name = 'signup'
        this.signUpService = SignUpService

        this.user = {}
    }

    signUp () {
        const { fullName, email, password } = this.user

        this.signUpService.signUp({
            fullName,
            email,
            password
        })
            .then((response) => {
                this.user = null
                this.error = null
                this.success = response.data
            })
            .catch((err) => {
                this.success = null
                this.error = err.data
            })
    }
}

export default SignupController
