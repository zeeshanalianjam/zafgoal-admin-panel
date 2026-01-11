import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { handleApiError } from '../utils/handleApiError'
import { Axios } from '../common/Axios'
import { summaryApi } from '../common/summaryApi'
import { useDispatch } from 'react-redux'
import { setAdmin } from '../store/admin/adminSlice'

const AdminPrivateRoute = ({ children }) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const token = localStorage.getItem('adminToken')
    if (!token) {
        return <Navigate to="/" />
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await Axios({
                    ...summaryApi.getUserDetails,
                })

                console.log(response)

                if (response.data.success) {
                    dispatch(setAdmin(response.data.data))
                }
            } catch (error) {
                handleApiError(error)
            }
        }


        fetchUser()
    }, [])



    return children;
}

export default AdminPrivateRoute
