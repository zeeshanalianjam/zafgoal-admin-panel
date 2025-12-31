import React from 'react'
import DashboardCard from '../../components/DashboardCard'
import DashboardLineChart from '../../components/DashboardAreaChart'

const SuperAdminDashboard = () => {
    return (
        <div className='pt-16  space-y-16'>
            {/* dashboard cards */}
            <div className=' flex justify-between flex-wrap items-center gap-y-4'>
                <DashboardCard />       
                <DashboardCard />
                <DashboardCard />
                <DashboardCard />

            </div>

            {/* line chart */}
            <div>
                <DashboardLineChart />
            </div>
        </div>
    )
}

export default SuperAdminDashboard
