import React from 'react'
import { FaWallet, FaFileAlt, FaGlobe, FaShoppingCart } from 'react-icons/fa';

const AdminManageCard = ({ name, Icon, isActive = false }) => {
    return (
        <div className={`${isActive ? "bg-[#213732] text-white" : "bg-white text-[#21373280]"}  w-[232px] h-[80px] rounded-[15px] flex justify-between items-center shadow-md px-4`}>
            <p className='text-[12px] font-medium w-[143px] '>{name}</p>

            {/* icon box */}
            <div className={`w-[45px] h-[45px] rounded-[12px] ${isActive ? "bg-white" : "bg-[#213732]"}  flex items-center justify-center shrink-0`}>
                <Icon size={20} className={`${isActive ? "text-[#213732]" : "text-white"}`} />
            </div>
        </div>
    )
}

export default AdminManageCard
