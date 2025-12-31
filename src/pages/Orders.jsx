import React from 'react'
import StockAvailability from '../components/StockAvailability'
import StocksDetails from '../components/StocksDetails'

const Orders = () => {
  const [stockOpen, setStockOpen] = React.useState(true)
  return (
    <div className='pt-16 space-y-10'>
        <div className='space-y-4'>
                {/* stocks availability & out of stock */}
                <div className='flex items-center justify-between gap-2'>
                    <StockAvailability stockOpen={stockOpen} setStockOpen={setStockOpen} />
                    <StockAvailability />
                </div>

                {/* orders details */}
                <div>
                    <StocksDetails />
                </div>

            </div>
    </div>
  )
}

export default Orders
