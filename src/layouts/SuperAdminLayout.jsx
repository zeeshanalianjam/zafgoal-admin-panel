


import React from 'react'
import logo from '../assets/logo.png'
import dashboardIcon from '../assets/dashboardIcon.png'
import manage from '../assets/manage.png'
import adminExpense from '../assets/adminExpense.png'
import products from '../assets/products.png'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";

const SuperAdminLayout = () => {
  const location = useLocation()

  // menu items
  const menuItems = [
    {
      name: 'Dashboard',
      icon: dashboardIcon,
      path: '/super-admin/dashboard'
    },
    {
      name: "Admin Management",
      icon: manage,
      path: '/super-admin/admin-management'
    },
    {
      name: "Expense",
      icon: adminExpense,
      path: '/super-admin/expense'
    },
    {
      name: "Products",
      icon: products,
      path: '/super-admin/products'
    }
  ]
  return (
    <div className='flex '>
      {/* sidebar */}
      <div className='bg-[#F1F3F4] w-[375px]  py-10 '>
        {/* logo */}
        <div className='text-center space-y-6'>
          <img src={logo} alt="logo" className='w-40  mx-auto' />
          <h2 className='text-[#213732] text-[39px] font-bold'>Zaf Goal</h2>

        </div>


        {/* menus */}
        <div className='px-6 py-6 space-y-6 relative'>
          {
            menuItems.map((item) => (
              <>
                <Link className={`flex items-center gap-4 ${location.pathname === item.path ? 'text-[#213732] font-semibold' : ''}`} to={item.path}>
                  <img className='w-[17px]' src={item.icon} alt="" />
                  <p className='text-[20px]'>{item.name}</p>
                </Link>
                {/* line for active link */}
                {location.pathname === item.path && <div className='absolute top-0 right-0 w-[4px] h-[36px] bg-[#213732]'></div>}
              </>
            ))
          }
        </div>



      </div>


      {/* main content */}
      <div className='bg-[#F1F3F4] w-[1025px] rounded-[45px]  m-2 px-10 py-10'>
        {/* header */}
        <div className='flex justify-between items-center '>
          <h2 className='font-semibold text-[32px]'>Welcome, Mickie!</h2>

          <div className='flex items-center  gap-8'>
            <div className='relative flex  items-center'>

              <input type="text" className='w-[372px] h-[56px] rounded-[14px] border-[0.5px] outline-none pl-16' />
              <div className='absolute left-2 w-10 h-10  rounded-full bg-[#F1F3F4] flex items-center justify-center cursor-pointer' >
                < IoSearchOutline size={20} />
              </div>

            </div>

            <div className='w-[48px] h-[48px] rounded-full bg-white flex items-center justify-center cursor-pointer'>
              <IoIosNotificationsOutline size={24} />
            </div>
          </div>

        </div>

        {/* page content */}
        <div>
          <Outlet />
        </div>
      </div>


    </div>
  )
}

export default SuperAdminLayout
