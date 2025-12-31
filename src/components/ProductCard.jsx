import React from 'react'
import swipeCircles from '../assets/swipeCircles.jpg'
import { MdFavoriteBorder } from "react-icons/md";

const ProductCard = ({ name, owner, image, link}) => {
    return (
        <div className='bg-white w-[350px]  rounded-[20px] flex flex-col  p-5 space-y-5 '>
            {/* image */}
            <div className='relative'>
                <img src={image} alt="" />
                <div className='absolute top-2 right-2 w-[34px] h-[34px]  rounded-[70px] bg-[#F1F3F4] flex items-center justify-center'>
                    <MdFavoriteBorder />

                </div>
            </div>


            {/* title & slug */}
            <div>
                <h3 className='text-[18px] font-semibold'>{name}</h3>
                <p className='text-[#213732] text-[14px]'>{owner}</p>
            </div>

            <div className='flex items-center justify-between text-[14px]'>
                <p className='text-[#213732] font-semibold '>Available</p>
                <button className='bg-[#213732] text-white w-[106px] h-[34px] rounded-[70px] font-medium'>Place Bid</button>
            </div>
        </div>
    )
}

export default ProductCard
