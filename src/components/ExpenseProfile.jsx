import React from 'react'
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

const ExpenseProfile = () => {
    return (
        <div className='bg-[#F1F3F4] w-[855px]  rounded-[12px] px-6 py-5'>
            {/* heading */}
            <div className='flex items-center justify-between'>
                <h3>Oliver Liam</h3>
                <div className='flex gap-6'>
                    <button className='flex items-center gap-1 text-[#FF3C26] text-[10px]'>
                        <MdDelete size={13} />  <p>DELETE</p>
                    </button>
                    <button className='flex items-center gap-1 text-[#213732] text-[10px]'>
                        <MdEdit size={13} />  <p>EDIT</p>
                    </button>
                </div>
            </div>

            {/* user info */}
            <div className='text-[12px] text-[#213732]'>
                <div className='flex gap-2'>
                    <p>Company Name: </p> <p>Viking Burrito</p>
                </div>
                <div className='flex gap-2'>
                    <p>Email Address: </p> <p>oliver@burrito.com</p>
                </div>
                <div className='flex gap-2'>
                    <p>VAT Number: </p> <p>FRB1235476</p>
                </div>
            </div>
        </div>
    )
}


export default ExpenseProfile
