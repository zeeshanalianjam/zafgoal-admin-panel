import React from 'react'
import { GoTag } from "react-icons/go";
import { FaBan } from "react-icons/fa";

const ExpenseReport = ({ stockOpen, setStockOpen }) => {

  const stockAvailable = {
    label: "Total Revenue ",
    value: "15555£",
    StockIcon: GoTag,
  }
  return (
    <div className='bg-white flex justify-between items-center w-[491px] h-[80px] rounded-[15px] shadow-md px-4'>
      <div className={` font-semibold ${stockOpen ? "text-[#00C678]" : "text-[#FF3C26]"}`}>
        <p className=' text-[12px]'>{stockOpen ? stockAvailable.label : "Loss"}</p>
        <div className='flex items-center gap-8'>
          <p className=' text-[18px]'>{stockOpen ? stockAvailable.value : "1500£"}</p>
        </div>
      </div>

      {/* icon box */}
      <div className={`w-[45px] h-[45px] rounded-[12px] ${stockOpen ? "bg-[#00C678]" : "bg-[#FF3C26]"} flex items-center justify-center shrink-0`}>
        {stockOpen ? <GoTag size={20} color='white' className='rotate-90' /> : <FaBan size={20} color='white' />}
      </div>
    </div>
  )
}

export default ExpenseReport

