const baseURL = "http://localhost:3000"

const userUrl = '/api/v1/user'

const summaryApi = {

    // users Api's
    register: {
        url: `${userUrl}/register`,
        method: `post`
    },
    login: {
        url: `${userUrl}/login`,
        method: `post`
    },
    logout: {
        url: `${userUrl}/logout`,
        method: `post`
    },
    forgotPassword: {
        url: `${userUrl}/forgot-password`,
        method: `put`
    },
    forgotPasswordOTPVerification: {
        url: `${userUrl}/forgot-password-otp-verify`,
        method: `put`
    },
    resetPassword: {
        url: `${userUrl}/reset-password`,
        method: `put`
    },

}

export { baseURL, summaryApi }

