

import React, { useState } from 'react'

const FeatureSettingsCard = ({ label }) => {
    const [isOnCreateEdit, setIsOnCreateEdit] = useState(true)
    const [isOnDelete, setIsOnDelete] = useState(false)
    const [isOnEditUnitPrice, setIsOnEditUnitPrice] = useState(true)
    const [isOnManageDiscount, setIsOnManageDiscount] = useState(true)


    // when use the real data to use map method
    const mockData = [
        {
            label: "Create/Edit Items",
            checked: isOnCreateEdit,
            setValue: setIsOnCreateEdit
        },
        {
            label: "Delete Items",
            checked: isOnDelete,
            setValue: setIsOnDelete
        },
        {
            label: "Edit Unit Price",
            checked: isOnEditUnitPrice,
            setValue: setIsOnEditUnitPrice
        },
        {
            label: "Manage Discounts",
            checked: isOnManageDiscount,
            setValue: setIsOnManageDiscount
        },
    ]
    
    return (
        <div className='bg-white w-[491px] h-[224px] border rounded-[14px] text-[12px] px-4 py-6 space-y-3'>
            {mockData.map((data) => (
                <div className='flex items-center justify-between border rounded-[5px] py-[3px] px-[14px]'>

                    <p className='font-semibold'>{data.label}</p>
                    <label className='toggle-container'>
                        <input type="checkbox" checked={data.checked} onChange={() => data.setValue(!data.checked)} className='accent-[#00CA85] w-10 h-5' />
                        <span className='slider'></span>
                    </label>

                </div>
            ))}



        </div>
    )
}

export default FeatureSettingsCard

