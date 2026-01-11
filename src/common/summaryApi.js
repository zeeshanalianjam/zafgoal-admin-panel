const baseURL = "http://localhost:3000"

const userUrl = '/api/v1/user'
const orderUrl = '/api/v1/order'

const summaryApi = {

    // Auth Api's
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


    // Users Api's
    getUserDetails: {
        url: `${userUrl}/get-user-details`,
        method: `get`
    },
    getAllUsers: {
        url: `${userUrl}/get-all-users`,
        method: `get`
    },


    // Orders Api's
    getAllOrders: {
        url: `${orderUrl}/get-all-orders`,
        method: `get`
    },
    orderSales: {
        url: `${orderUrl}/total-sales`,
        method: `get`
    },
    weeklyStats: {
        url: `${orderUrl}/weekly-sales-stats`,
        method: `get`
    },
    monthlyStats: {
        url: `${orderUrl}/monthly-sales-stats`,
        method: `get`
    },


}

export { baseURL, summaryApi }

