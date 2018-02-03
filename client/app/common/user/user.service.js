const UserService = ($http, $location, API_URL) => {
    'ngInject'

    const isLoggedIn = () => {
        return $http.get(`${API_URL}/api/status`, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
    }

    const logIn = credentials => $http.post(`${API_URL}/api/login`, credentials)

    const logOut = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')

        $location.path('/login')
    }

    const forgot = email => $http.post(`${API_URL}/api/forgot`, { email })

    const reset = (resetToken, newPassword) => $http.post(`${API_URL}/api/reset/${resetToken}`, { newPassword })

    return {
        isLoggedIn,
        logIn,
        logOut,
        forgot,
        reset
    }
}

export default UserService
