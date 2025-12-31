import React from 'react'
import ProductCard from '../components/ProductCard'
import swipeCircles from '../assets/swipeCircles.jpg'
import colorfulHeaven from '../assets/colorfulHeaven.png'
import bottel from '../assets/bottel.png'
import eggs from '../assets/eggs.png'

const Products = () => {
  return (
    <div className='pt-16 space-y-10'>

      {/* recently added */}
      <div className='space-y-6'>
        <div>
          <h3 className='font-semibold text-[24px]'>Recently Added</h3>
        </div>


        <div className='flex justify-between items-center gap-4'>
          <ProductCard name="Swipe Circles" owner="By Peter Will" image={swipeCircles} />
          <ProductCard name="Colorful Heaven" owner="By Mark Benjamin" image={colorfulHeaven} link="" />
          <ProductCard name="3D Cubes Art" owner="By Manny Gates" image={bottel} />
        </div>
      </div>

      {/* all products */}
      <div className='space-y-6'>
        <div>
          <h3 className='font-semibold text-[24px]'>All Products</h3>
        </div>


        <div className='flex justify-between items-center gap-4'>
          <ProductCard name="Whole Milk(2L)" owner="" image={bottel} />
          <ProductCard name="Whole Milk(2L)" owner="" image={eggs} />
          <ProductCard name="Whole Milk(2L)" owner="" image={swipeCircles} />
        </div>
      </div>
    </div>
  )
}

export default Products
