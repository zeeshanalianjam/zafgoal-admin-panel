import React, { useEffect, useState } from 'react'
import DashboardCard from '../../components/DashboardCard'
import DashboardLineChart from '../../components/DashboardAreaChart'
import { Axios } from '../../common/Axios'
import { summaryApi } from '../../common/summaryApi'
import { handleApiError } from '../../utils/handleApiError'
import { FaWallet, FaFileAlt, FaGlobe, FaShoppingCart } from 'react-icons/fa';

const SuperAdminDashboard = () => {

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [users, setUsers] = useState([])

    const isPositiveTodaySales = data.todayPercentage >= 0
    const isPositiveTotalSales = data.totalPercentage >= 0

    const isPositiveTodayUsers = users.todayPercentage >= 0
    const isPositiveTotalUsers = users.totalPercentage >= 0

    useEffect(() => {
        const totalSales = async () => {
            try {
                setLoading(true)
                const response = await Axios({
                    ...summaryApi.orderSales
                })

                if (response.data.success) {
                    setData(response.data.data)
                }

            } catch (error) {
                handleApiError(error)
            } finally {
                setLoading(false)
            }
        }

        const getAllUsers = async () => {
            try {
                setLoading(true)
                const response = await Axios({
                    ...summaryApi.getAllUsers
                })

                if (response.data.success) {
                    setUsers(response.data.data)
                }

            } catch (error) {
                handleApiError(error)
            } finally {
                setLoading(false)
            }

        }


        totalSales()
        getAllUsers()
    }, [])


    return (
        <div className='pt-16  space-y-16'>
            {/* dashboard cards */}
            <div className=' flex justify-between flex-wrap items-center gap-y-4'>
                <DashboardCard name="Today Sales" amountIn={data.todaySales} Icon={FaWallet} percentage={data.todayPercentage} isPositive={isPositiveTodaySales} loading={loading} />
                <DashboardCard name="Total Sales" amountIn={data.totalSales} Icon={FaFileAlt} percentage={data.totalPercentage} isPositive={isPositiveTotalSales} loading={loading} />
                <DashboardCard name="Today Clients" amountIn={users.todayUsers} Icon={FaGlobe} percentage={users.todayPercentage} isPositive={isPositiveTodayUsers} loading={loading} />
                <DashboardCard name="Total Clients" amountIn={users.totalUsers} Icon={FaShoppingCart} percentage={users.totalPercentage} isPositive={isPositiveTotalUsers} loading={loading} />

            </div>

            {/* line chart */}
            <div>
                <DashboardLineChart />
            </div>
        </div>
    )
}

export default SuperAdminDashboard
