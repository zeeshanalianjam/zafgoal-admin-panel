import React from 'react'
import { FaWallet, FaFileAlt, FaGlobe, FaShoppingCart } from 'react-icons/fa';

const DashboardCard = () => {
  return (
    <div className='bg-white flex justify-between items-center w-[382px] h-[80px] rounded-[15px] shadow-md px-4'>
      <div className=' font-medium'>
        <p className='text-[#21373280] text-[12px]'>Today’s Money</p>
        <div className='flex items-center gap-8'>
          <p className='text-[#213732]'>£53,000</p>
          <p className='text-[#00C678]'>+55%</p>
        </div>
      </div>

      {/* icon box */}
      <div className='w-[45px] h-[45px] rounded-[12px] bg-[#213732] flex items-center justify-center shrink-0'>
        <FaWallet size={20} color='white' />
      </div>
    </div>
  )
}

export default DashboardCard
