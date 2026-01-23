


import React, { useState } from 'react'
import logo from '../assets/logo.png'
import dashboardIcon from '../assets/dashboardIcon.png'
import manage from '../assets/manage.png'
import adminExpense from '../assets/adminExpense.png'
import products from '../assets/products.png'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import view_list from '../assets/view_list.png'
import receipt from '../assets/receipt.png'
import { useDispatch, useSelector } from 'react-redux'
import logoutIcon from '../assets/logout.png'
import { Axios } from '../common/Axios'
import { summaryApi } from '../common/summaryApi'
import { handleApiError } from '../utils/handleApiError'
import { logout } from '../store/admin/adminSlice'


const SuperAdminLayout = () => {
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const admin = useSelector(state => state.admin)

  // menu items
  const menuItems = [
    {
      name: 'Dashboard',
      icon: dashboardIcon,
      path: '/super-admin/dashboard',
    },
    {
      name: "Admin Management",
      icon: manage,
      path: '/super-admin/admin-management',
    },
    {
      name: "User Management",
      icon: manage,
      path: '/super-admin/user-management',
    },
    {
      name: "Expense",
      icon: adminExpense,
      path: '/super-admin/expense',
    },
    {
      name: "Products",
      icon: products,
      path: '/super-admin/products',
    },
    {
      name: "Inventory",
      path: '/super-admin/inventory',
      icon: view_list,
    },
    {
      name: "Orders",
      path: '/super-admin/orders',
      icon: receipt,
    }
  ]


  const handleLogout = async () => {
    try {
      setLoading(true)

      const response = await Axios({
        ...summaryApi.logout
      })

      if (response.data.success) {
        localStorage.removeItem("superAdminToken")
        dispatch(logout())
        navigate('/')
      }
    } catch (error) {
      handleApiError(error)
    } finally {
      setLoading(false)
    }

  }


  return (
    <div className='flex '>
      {/* sidebar */}
      <div className='bg-[#F1F3F4] w-[23%] py-10 shrink-0'>
        {/* logo */}
        <div className='text-center space-y-1'>
          <img src={logo} alt="logo" className='w-40 mx-auto shrink-0' />
        </div>

        {/* menus */}
        <div className="py-10 relative">
          <hr className="relative bottom-2" />

          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-4 py-3 px-6 border-b relative transition
           ${isActive
                  ? "text-[#213732] font-semibold bg-gray-200"
                  : "text-gray-600 hover:text-[#213732] hover:bg-gray-200"}`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Active / Hover Line */}
                  <span
                    className={`absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[36px] bg-[#213732] transition 
              ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                  />

                  <img className="w-[17px]" src={item.icon} alt="" />
                  <p className="text-[18px]">{item.name}</p>
                </>
              )}
            </NavLink>
          ))}

          {/* Logout Button - SAME STYLE AS MENUS */}
          <button
            onClick={handleLogout}
            className="group flex items-center gap-4 py-3 px-6 border-b relative transition 
      text-gray-600 hover:text-[#213732] hover:bg-gray-200 w-full"
          >
            {/* Hover Line */}
            <span
              className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[36px] bg-[#213732] opacity-0 group-hover:opacity-100 transition"
            />

            <img className="w-[17px]" src={logoutIcon} alt="logout" />
         <p className="text-[18px]">{loading ? "Logging out..." : "Logout"}</p>
          </button>
        </div>
      </div>



      {/* main content */}
      <div className='bg-[#F1F3F4]  w-[75%] rounded-[45px]  mx-auto my-3 px-10 py-10 shrink-0'>
        {/* header */}
        <div className='flex justify-between items-center '>
          <h2 className='font-semibold text-[32px]'>{`Welcome, ${admin._id !== '' ? admin?.name : "Mickie"}!`}</h2>

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
