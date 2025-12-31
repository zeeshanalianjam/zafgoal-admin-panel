import React from 'react'
import logo from '../assets/logo.png'
import dashboardIcon from '../assets/dashboardIcon.png'
import manage from '../assets/manage.png'
import adminExpense from '../assets/adminExpense.png'
import products from '../assets/products.png'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import view_list from '../assets/view_list.png'
import receipt from '../assets/receipt.png'


const AdminLayout = () => {
  const location = useLocation()

  // menu items
  const menuItems = [
    {
      name: 'Dashboard',
      icon: dashboardIcon,
      path: '/admin/dashboard'
    },
    {
      name: "Admin Management",
      icon: manage,
      path: '/admin/admin-management'
    },
    {
      name: "Expense",
      icon: adminExpense,
      path: '/admin/expense'
    },
    {
      name: "Products",
      icon: products,
      path: '/admin/products',
      subMenu: {
        name: "Inventory",
        path: '/admin/products/inventory',
        icon: view_list
      },
      subMenu2: {
        name: "Orders",
        path: '/admin/products/orders',
        icon: receipt
      }
    },
  ]
  return (
    <div className='flex overflow-hidden'>
      {/* sidebar */}
      <div className='bg-[#F1F3F4] w-[23%]  py-10 shrink-0'>
        {/* logo */}
        <div className='text-center space-y-1'>
          <img src={logo} alt="logo" className='w-40  mx-auto shrink-0' />
          {/* <h2 className='text-[#213732] text-[39px] font-bold'>Zaf Goal</h2> */}

        </div>


        {/* menus */}
        <div className=' py-10 relative'>
          <hr className='relative bottom-2'/>
          {
            menuItems.map((item) => (
              <>
                <Link className={`flex items-center gap-4 pb-3 px-6 border-b ${location.pathname === item.path || location.pathname === item.subMenu?.path || location.pathname === item.subMenu2?.path ? 'text-[#213732] font-semibold' : ''}`} to={item.path}>
                  <img className='w-[17px]' src={item.icon} alt="" />
                  <p className='text-[20px]'>{item.name}</p>
                </Link>


                <Link className={` ml-16  flex items-center  gap-2 py-2 ${location.pathname === item.subMenu?.path ? 'text-[#213732] font-semibold' : ''}`} to={item.subMenu?.path}>
                  <img className='w-[14px] ' src={item.subMenu?.icon} alt="" />
                  <p className='text-[14px] '>{item.subMenu?.name}</p>
                </Link>
                <Link className={`ml-16 flex items-center gap-2   ${location.pathname === item.subMenu2?.path ? 'text-[#213732] font-semibold' : ''}`} to={item.subMenu2?.path}>
                  <img className='w-[14px]' src={item.subMenu2?.icon} alt="" />
                  <p className='text-[14px  ]'>{item.subMenu2?.name}</p>
                </Link>


                {/* line for active link */}
                {location.pathname === "/admin/dashboard" && <div className='absolute top-10 right-0 w-[3px] h-[36px] bg-[#213732]'></div>}
                {location.pathname === "/admin/admin-management" && <div className='absolute top-24 right-0 w-[3px] h-[36px] bg-[#213732]'></div>}
                {location.pathname === "/admin/expense" && <div className='absolute top-[155px] right-0 w-[3px] h-[36px] bg-[#213732]'></div>}
                {location.pathname === "/admin/products" && <div className='absolute top-[214px] right-0 w-[3px] h-[36px] bg-[#213732]'></div>}
                {location.pathname === "/admin/products/inventory" && <div className='absolute top-[265px] right-0 w-[2px] h-[26px] bg-[#213732]'></div>}
                {location.pathname === "/admin/products/orders" && <div className='absolute top-[295px] right-0 w-[2px] h-[26px] bg-[#213732]'></div>}
              </>
            ))
          }
        </div>



      </div>


      {/* main content */}
      <div className='bg-[#F1F3F4] w-[75%] rounded-[45px]  mx-auto my-3 px-10 py-10 shrink-0'>
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

export default AdminLayout
