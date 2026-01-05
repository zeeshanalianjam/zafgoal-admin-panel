import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoCloseSharp } from "react-icons/io5";
import { handleApiError } from "../../utils/handleApiError";
import { Axios } from "../../common/Axios";
import { summaryApi } from "../../common/summaryApi";

const OTPVerification = ({ otpVerify, setOtpVerify }) => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);


    // Handle OTP Change
    const handleOtpChange = (e, index) => {
        const value = e.target.value;

        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to next input
        if (value && index < otp.length - 1) {
            document.getElementById(`otp-${index + 1}`)?.focus();
        }
    };

    // Handle Backspace
    const handleOtpKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`)?.focus();
        }
    };

    // Submit OTP
    const handleSubmit = async () => {
        const finalOtp = otp.join("");
        console.log("Entered OTP:", finalOtp);

        if (finalOtp.length !== 6) return alert("Please enter full OTP");

        try {
            setLoading(true);
            const response = await Axios({
                ...summaryApi.forgotPasswordOTPVerification,
                data: {
                    otp: finalOtp
                }
            })

            setOtpVerify(false);
        } catch (error) {
            handleApiError(error)
        }

    };

    return (
        <AnimatePresence>
            {otpVerify && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 30 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="relative w-[90%] max-w-[420px] rounded-2xl bg-white p-6 shadow-xl"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setOtpVerify(false)}
                            className="absolute right-4 top-4 rounded-full p-2 hover:bg-gray-100"
                        >
                            <IoCloseSharp size={20} />
                        </button>

                        <h2 className="text-[24px] font-semibold text-[#213732]">
                            OTP Verification
                        </h2>

                        <p className="mt-1 text-[14px] text-gray-600">
                            Enter the 6-digit code sent to your email
                        </p>

                        {/* OTP Inputs */}
                        <div className="mt-5 flex flex-col gap-2">
                            <label className="text-[14px] font-medium">
                                Enter 6-Digit OTP
                            </label>

                            <div className="flex justify-between gap-2">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        id={`otp-${index}`}
                                        type="text"
                                        maxLength={1}
                                        inputMode="numeric"
                                        value={digit}
                                        onChange={(e) => handleOtpChange(e, index)}
                                        onKeyDown={(e) => handleOtpKeyDown(e, index)}
                                        className="h-[50px] w-[50px] text-center text-lg rounded-xl border border-gray-300 outline-none focus:border-[#213732]"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Verify Button */}
                        <button
                            onClick={handleSubmit}
                            className="mt-6 h-[50px] w-full rounded-xl bg-[#213732] font-semibold text-white hover:opacity-90"
                        >
                            Verify OTP
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default OTPVerification;
