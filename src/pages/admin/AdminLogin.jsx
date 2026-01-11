import React, { useState } from 'react'
import loginBG from '../../assets/loginBG.jpg'
import logo from '../../assets/logo.png'
import googleIcon from '../../assets/googleIcon.png'
import facebookIcon from '../../assets/facebookIcon.png'
import { Link, useNavigate } from 'react-router-dom'
import { Axios } from '../../common/Axios'
import { summaryApi } from '../../common/summaryApi'
import { handleApiError } from '../../utils/handleApiError'
import { motion, AnimatePresence } from 'framer-motion'
import EmailPopup from '../../components/poups/EmailPopup'
import { useDispatch } from 'react-redux'
import { setAdmin } from '../../store/admin/adminSlice'

const AdminLogin = () => {
  const [data, setData] = useState({
    email: "",
    password: ""
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [emailOpen, setEmailOpen] = useState(false)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }



  // login Api
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await Axios({
        ...summaryApi.login,
        data
      })

      if (response.data.success) {
        const token = response.data.data.token
        localStorage.setItem('adminToken', token)
        dispatch(setAdmin(response.data.data.user))

        setData({
          email: "",
          password: ""
        })
        navigate("/admin/dashboard")

      }
    } catch (error) {
      handleApiError(error)
    } finally {
      setLoading(false)
    }
  }



  return (
    <div className=' w-full' style={{ backgroundImage: `url(${loginBG})`, backgroundSize: 'cover' }}>
      <div className='flex flex-col items-center justify-center gap-4 py-10'>

        {/* logo */}
        <div className='text-center'>
          <img src={logo} alt="logo" className='w-40  mx-auto' />
          {/* <h2 className='text-[#213732] text-[39px] font-bold'>Zaf Goal</h2> */}

        </div>

        {/* form */}
        <form onSubmit={handleSubmit} className='border-2 rounded-[40px] text-white bg-[#2137320D] backdrop-blur-md py-10 w-[690px]'>
          <div className='w-[500px] mx-auto space-y-6'>
            <h3 className='text-[28px] font-[400]'>Login as a Admin</h3>

            {/* inputs fields */}
            <div className='flex flex-col'>
              <label className='text-[18px]' htmlFor="email">Enter Your Admin Email ID</label>
              <input className='rounded-[14px] outline-none h-[50px] text-black px-4' type="text" placeholder='admin@gmail.com'
                name='email' value={data.email} onChange={handleChange} />
            </div>
            <div className='flex flex-col'>
              <label className='text-[18px]' htmlFor="email">Password</label>
              <input className='rounded-[14px] outline-none h-[50px] text-black px-4' type="password" placeholder='password'
                name='password' value={data.password} onChange={handleChange} />
              <div>
                <p onClick={() => setEmailOpen(true)} className='text-[12px] pt-4 cursor-pointer w-fit'>Forgot Password?</p>
              </div>
            </div>



            {/* submit button */}
            <div className='flex flex-col'>
              <button className='rounded-[14px] outline-none h-[50px] text-[20px] bg-[#213732] px-4' type="submit"  >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-t-2 border-white border-solid rounded-full mx-auto"
                  />
                ) : (
                  <>
                    Sign In
                  </>
                )}
              </button>
            </div>

            <p className='text-center'>or continue with</p>

            {/* continue with buttons */}
            <div className=''>
              <div className='flex items-center justify-center gap-[20px]'>
                <button className='w-[150px] h-[50px] bg-white flex items-center justify-center rounded-[10px]'>
                  <img className='w-[24px]' src={googleIcon} alt="" />
                </button>
                <button className='w-[150px] h-[50px] bg-white flex items-center justify-center rounded-[10px]'>
                  <img className='w-[24px]' src={facebookIcon} alt="" />
                </button>
              </div>
            </div>

            <p className='text-center font-semibold '><Link to={"/super-admin/login"}>Login as a Super Admin</Link></p>


          </div>
        </form>



        {/* Email Modal */}
        <EmailPopup emailOpen={emailOpen} setEmailOpen={setEmailOpen} />
      </div>
    </div>
  )
}

export default AdminLogin
