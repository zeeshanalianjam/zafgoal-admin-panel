import { motion, AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { Axios } from '../../common/Axios'
import { summaryApi } from '../../common/summaryApi'
import { handleApiError } from '../../utils/handleApiError'
import toast from 'react-hot-toast'

const ResetPassword = ({ open, setOpen, data }) => {
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)



    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await Axios({
                ...summaryApi.resetPassword,
                data: {
                    email: data,
                    password
                }
            })

            if (response.data.success) {
                setOpen(false)
                setPassword("")
                toast.success(response.data.message)
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
                {open && (
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
                                Reset Password
                            </h2>

                            <p className="mt-1 text-[14px] text-gray-600">
                                Enter your new password
                            </p>

                            {/* Input */}
                            <div className="mt-5 flex flex-col gap-2">
                                <label className="text-[14px] font-medium">New Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    name='password'
                                    className="h-[50px] rounded-xl border border-gray-300 px-4 outline-none focus:border-[#213732]"
                                />
                            </div>

                            {/* Action Button */}
                            <button onClick={handleSubmit} className="mt-6 h-[50px] w-full rounded-xl bg-[#213732] font-semibold text-white hover:opacity-90">
                                {loading ? <> <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="h-5 w-5 border-t-2 border-white border-solid rounded-full mx-auto" /></> : "Reset Now"}
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </>
    )
}

export default ResetPassword
