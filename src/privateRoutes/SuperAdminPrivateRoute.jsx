import React from 'react'
import { Navigate } from 'react-router-dom'

const SuperAdminPrivateRoute = ({ children }) => {
    const token = localStorage.getItem('superAdminToken')
    if (!token) {
        return <Navigate to="/super-admin/login" />
    }

    return children
}

export default SuperAdminPrivateRoute
