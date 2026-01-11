import React from 'react'
import { FaWallet, FaFileAlt, FaGlobe, FaShoppingCart } from 'react-icons/fa';
import { motion } from 'framer-motion';

const DashboardCard = ({ name, Icon, amountIn, percentage, isPositive, loading }) => {

  function loader() {
    return (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-3 h-3 border-t-2 border-black border-solid rounded-full mx-2"
      />
    )
  }


  return (
    <div className='bg-white flex justify-between items-center w-[382px] h-[80px] rounded-[15px] shadow-md px-4'>
      <div className=' font-medium'>
        <p className='text-[#21373280] text-[12px]'>{name}</p>
        <div className='flex items-center gap-8'>
          <p className='text-[#213732] flex items-center '>£{loading ? loader() : amountIn}</p>
          <p className={`${isPositive ? "text-green-500" : "text-red-500"} flex items-center`}>  {isPositive ? "+" : ""}
            {loading ? loader() : percentage?.toFixed(0)}%</p>
        </div>
      </div>

      {/* icon box */}
      <div className='w-[45px] h-[45px] rounded-[12px] bg-[#213732] flex items-center justify-center shrink-0'>
        {Icon && <Icon size={20} color='white' />}
      </div>
    </div>
  )
}

export default DashboardCard
