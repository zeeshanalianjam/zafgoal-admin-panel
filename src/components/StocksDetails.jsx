import React, { useState } from 'react'
import { GoTag } from "react-icons/go";
import { TbCategoryPlus } from "react-icons/tb";
import { MdOutlineFilterAlt } from "react-icons/md";
import StockData from './StockData';
import { useLocation } from 'react-router-dom';
import OrderData from './OrderData';

const StocksDetails = () => {
    const location = useLocation()
    const [view, setView] = useState('items');
    const [filterStatus, setFilterStatus] = useState('All');

    const mockData = [
        {
            "categoryId": "c1",
            "categoryName": "Dairy & Eggs",
            "products": [
                { "id": "p1", "name": "Organic Whole Milk", "status": "In Stock", "stock": 12 },
                { "id": "p2", "name": "Greek Yogurt (Plain)", "status": "Out of Stock", "stock": 0 }
            ]
        },
        {
            "categoryId": "c2",
            "categoryName": "Household",
            "products": [
                { "id": "p3", "name": "Laundry Detergent Pods", "status": "Low Stock", "stock": 5 }
            ]
        },
        {
            "categoryId": "c3",
            "categoryName": "Pantry",
            "products": [
                { "id": "p4", "name": "Basmati Rice (5kg)", "status": "In Stock", "stock": 25 }
            ]
        }
    ]

    const allItems = mockData.flatMap((category) => category.products.map((product) => ({ ...product, section: category.categoryName })));
    // console.log(allItems)

    const filteredItems = filterStatus === 'All' ? allItems : allItems.filter((item) => item.status === filterStatus);
    // console.log("filter items", filteredItems)


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
                {location.pathname === "/admin/products/orders" ? "" : <div className="flex bg-gray-200 p-1 rounded-xl">
                    <button
                        onClick={() => setView('items')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${view === 'items' ? 'bg-white shadow-md' : 'text-gray-600'}`}
                    >
                        <GoTag size={14} className=' shrink-0 rotate-90' /> <p>Items</p>
                    </button>
                    <button
                        onClick={() => setView('category')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${view === 'category' ? 'bg-white shadow-md' : 'text-gray-600'}`}
                    >
                        <TbCategoryPlus size={14} className=' shrink-0' /> <p>Category</p>
                    </button>
                </div>}

                {/* right */}
                {location.pathname === "/admin/products/orders" ? "" : <select
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border p-2 rounded-xl bg-white shadow-sm outline-none"
                >
                    <option value="All">All Status</option>
                    <option value="In Stock">In Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                    <option value="Low Stock">Low Stock</option>
                </select>}
            </div>


            {/* stocks data */}
            <div>
                {location.pathname == "/admin/products/orders" ? <OrderData /> : <StockData view={view} filteredItems={filteredItems} data={mockData} />}
            </div>


        </div>
    )
}

export default StocksDetails
