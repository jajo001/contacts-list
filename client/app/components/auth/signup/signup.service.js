const SignUpService = ($http, API_URL) => {
    'ngInject'

    const signUp = user => $http.post(`${API_URL}/api/signup`, user)

    return { signUp }
}

export default SignUpService
