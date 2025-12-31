import React from 'react'
import ExpenseReport from '../components/ExpenseReport'
import BillingInfo from '../components/BillingInfo'

const Expense = () => {
    const [stockOpen, setStockOpen] = React.useState(true)
    return (
        <div className='pt-16 space-y-10'>
            {/* analytics reports */}
            <div className='flex items-center justify-between gap-2'>
                <ExpenseReport stockOpen={stockOpen} setStockOpen={setStockOpen} />
                <ExpenseReport />
            </div>


            {/* billing information */}
            <div>
                <BillingInfo />
            </div>

        </div>
    )
}

export default Expense
