import React from 'react'
import ExpenseProfile from './ExpenseProfile'

const BillingInfo = () => {
    return (
        <div className='bg-white px-10 py-5 space-y-6 rounded-[15px]'>
            {/* heading */}
            <h3 className='font-bold'>Billing Information</h3>

            {/* expense profile */}
            <div className='space-y-8'>
                <ExpenseProfile />
                <ExpenseProfile />
                <ExpenseProfile />
            </div>
        </div>
    )
}

export default BillingInfo
