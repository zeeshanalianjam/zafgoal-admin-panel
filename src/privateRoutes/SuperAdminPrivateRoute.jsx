import React from 'react'
import { Navigate } from 'react-router-dom'

const SuperAdminPrivateRoute = ({children}) => {
    const token = localStorage.getItem('superAdminToken')

    return token ? {children} : <Navigate to="/super-admin/login" />
}

export default SuperAdminPrivateRoute
