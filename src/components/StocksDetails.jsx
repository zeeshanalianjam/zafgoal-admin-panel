import React from 'react'
import { GoTag } from "react-icons/go";
import { TbCategoryPlus } from "react-icons/tb";
import { MdOutlineFilterAlt } from "react-icons/md";
import StockData from './StockData';
import { useLocation } from 'react-router-dom';
import OrderData from './OrderData';

const StocksDetails = () => {
    const location = useLocation()
    return (
        <div className='bg-white w-[953px]  rounded-[14px] px-4 py-6 space-y-6'>
            {/* title */}
            <div>
                {location.pathname === '/admin/admin-management' && <h3 className='font-semibold text-[24px]'>Stocks</h3>}
                {location.pathname === '/super-admin/admin-management' && <h3 className='font-semibold text-[24px]'>Stocks</h3>}
                {location.pathname === '/super-admin/products/inventory' && <h3 className='font-semibold text-[24px]'>Inventory</h3>}
                {location.pathname === '/admin/products/inventory' && <h3 className='font-semibold text-[24px]'>Inventory</h3>}
                {location.pathname === '/admin/products/orders' && <h3 className='font-semibold text-[24px]'>Orders</h3>}
                {location.pathname === '/super-admin/products/orders' && <h3 className='font-semibold text-[24px]'>Orders</h3>}
            </div>

            {/* filters */}
            <div className='flex items-center justify-between'>
                {/* left */}
               {location.pathname === "/admin/products/orders" ? "" : <div className='w-[200px] h-[47px] rounded-[14px] bg-[#F1F3F4] flex items-center justify-center gap-2'>
                    <div className='bg-white w-[91px] h-[41px] rounded-[14px] shadow-md flex items-center justify-center gap-[6px] cursor-pointer'>
                        <GoTag className='rotate-90 shrink-0' /> <p>Items</p>
                    </div>
                    <div className=' flex items-center justify-center gap-[6px] cursor-pointer'>
                        <TbCategoryPlus className='rotate-90 shrink-0' /> <p>Category</p>
                    </div>
                </div>}

                {/* right */}
                { location.pathname === "/admin/products/orders" ? "" :<div className='bg-[#F1F3F4] w-[88px] h-[47px] rounded-[14px] flex items-center justify-center gap-[6px]'>
                    <MdOutlineFilterAlt size={20} className=' shrink-0' /> <p>Filter</p>
                </div>}
            </div>


            {/* stocks data */}
            <div>
                {location.pathname == "/admin/products/orders" ? <OrderData /> : <StockData />}
            </div>


        </div>
    )
}

export default StocksDetails
