import { motion, AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { Axios } from '../../common/Axios'
import { summaryApi } from '../../common/summaryApi'
import { handleApiError } from '../../utils/handleApiError'
import OTPVerification from './OTPVerification'

const EmailPopup = ({ emailOpen, setEmailOpen }) => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [otpVerify, setOtpVerify] = useState(true)


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await Axios({
                ...summaryApi.forgotPassword,
                data: {
                    email
                }
            })

            if (response.data.success) {
                setEmailOpen(false)
                setOtpVerify(true)
                setEmail('')
            }

        } catch (error) {
            handleApiError(error)
        } finally {
            setLoading(false)
        }
    }


    return (
        <>
        
        <AnimatePresence>
            {emailOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Modal Box */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 30 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="relative w-[90%] max-w-[420px] rounded-2xl bg-white p-6 shadow-xl"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setEmailOpen(false)}
                            className="absolute right-4 top-4 rounded-full p-2 hover:bg-gray-100"
                        >
                            <IoCloseSharp size={20} />
                        </button>

                        <h2 className="text-[24px] font-semibold text-[#213732]">
                            Forgot Password?
                        </h2>

                        <p className="mt-1 text-[14px] text-gray-600">
                            Enter your email address to reset your password
                        </p>

                        {/* Input */}
                        <div className="mt-5 flex flex-col gap-2">
                            <label className="text-[14px] font-medium">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                name='email'
                                placeholder="admin@gmail.com"
                                className="h-[50px] rounded-xl border border-gray-300 px-4 outline-none focus:border-[#213732]"
                            />
                        </div>

                        {/* Action Button */}
                        <button onClick={handleSubmit} className="mt-6 h-[50px] w-full rounded-xl bg-[#213732] font-semibold text-white hover:opacity-90">
                            Send Reset Link
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

         {/* forgot password OTP verification */}
        <OTPVerification otpVerify={otpVerify} setOtpVerify={setOtpVerify} />
        </>
    )
}

export default EmailPopup
