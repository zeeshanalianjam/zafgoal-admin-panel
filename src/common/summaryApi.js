// const baseURL = "https://zafgoal.onrender.com"
const baseURL = "http://localhost:3000";

const userUrl = "/api/v1/user";
const orderUrl = "/api/v1/order";
const productUrl = "/api/v1/product";

const summaryApi = {
  // Auth Api's
  pendingRegister: {
    url: `/api/v1/pendingUser/pending-register`,
    method: `post`,
  },
  registerOTPVerify: {
    url: `${userUrl}/register`,
    method: `post`,
  },
  resendRegisterOTP: {
    url: `${userUrl}/resend-otp`,
    method: `post`,
  },
  login: {
    url: `${userUrl}/login`,
    method: `post`,
  },
  logout: {
    url: `${userUrl}/logout`,
    method: `post`,
  },
  forgotPassword: {
    url: `${userUrl}/forgot-password`,
    method: `put`,
  },
  forgotPasswordOTPVerification: {
    url: `${userUrl}/forgot-password-otp-verify`,
    method: `put`,
  },
  resetPassword: {
    url: `${userUrl}/reset-password`,
    method: `put`,
  },

  // Users Api's
  getUserDetails: {
    url: `${userUrl}/get-user-details`,
    method: `get`,
  },
  getAllUsersDetails: {
    url: `${userUrl}/get-all-users-details`,
    method: `get`,
  },
  getAllUsers: {
    url: `${userUrl}/get-all-users`,
    method: `get`,
  },
  deleteUser: (userId) => ({
    url: `${userUrl}/delete-user/${userId}`,
    method: `delete`,
  }),

  // Orders Api's
  getAllOrders: {
    url: `${orderUrl}/get-all-orders`,
    method: `get`,
  },
  orderSales: {
    url: `${orderUrl}/total-sales`,
    method: `get`,
  },
  weeklyStats: {
    url: `${orderUrl}/weekly-sales-stats`,
    method: `get`,
  },
  monthlyStats: {
    url: `${orderUrl}/monthly-sales-stats`,
    method: `get`,
  },

  // Products Api's
  getAllProducts: {
    url: `${productUrl}/get-all-products`,
    method: `get`,
  },

  // Admins Api's
  getAllAdmins: {
    url: `${userUrl}/get-all-admins`,
    method: `get`,
  },
  updateAdminDetails: (adminId) => ({
    url: `${userUrl}/update-admin-details/${adminId}`,
    method: `put`,
  }),
  deleteAdmin: (adminId) => ({
    url: `${userUrl}/delete-admin/${adminId}`,
    method: `delete`,
  }),
};

export { baseURL, summaryApi };
