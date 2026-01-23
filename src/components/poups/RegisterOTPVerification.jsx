import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoCloseSharp } from "react-icons/io5";
import { handleApiError } from "../../utils/handleApiError";
import { Axios } from "../../common/Axios";
import { summaryApi } from "../../common/summaryApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const RegisterOTPVerification = ({ otpVerify, setOtpVerify }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const [resendTimer, setResendTimer] = useState(60);
  const [resendLoading, setResendLoading] = useState(false);

  const admin = useSelector((state) => state.admin);

  /* ================= TIMER ================= */
  useEffect(() => {
    if (!otpVerify) return;
    if (resendTimer === 0) return;

    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTimer, otpVerify]);

  /* ================= OTP CHANGE ================= */
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  /* ================= BACKSPACE ================= */
  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  /* ================= PASTE OTP ================= */
  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    if (!/^\d{6}$/.test(pastedData)) {
      toast.error("Invalid OTP format");
      return;
    }

    setOtp(pastedData.split(""));
    document.getElementById("otp-5")?.focus();
  };

  /* ================= VERIFY OTP ================= */
  const handleSubmit = async () => {
    const finalOtp = otp.join("");
    if (finalOtp.length !== 6) return toast.error("Please enter full OTP");

    try {
      setLoading(true);
      const response = await Axios({
        ...summaryApi.registerOTPVerify,
        data: {
          otp: finalOtp,
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setOtpVerify(false);
        setOtp(["", "", "", "", "", ""]);
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= RESEND OTP ================= */
  const handleResendOtp = async () => {
    if (resendTimer > 0) return;

    try {
      setResendLoading(true);

      const response = await Axios({
        ...summaryApi.resendRegisterOTP,
        data: {
          email: admin?.email,
        },
      });

      if (response.data.success) {
        toast.success("OTP resent successfully");
        setOtp(["", "", "", "", "", ""]);
        setResendTimer(60);
        document.getElementById("otp-0")?.focus();
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {otpVerify && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 40 }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
              className="relative w-[90%] max-w-[420px] rounded-2xl bg-white p-6 shadow-2xl"
            >
              {/* Close */}
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

              {/* OTP INPUTS */}
              <motion.div
                className="mt-6 flex justify-between gap-2"
                onPaste={handleOtpPaste}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.07 },
                  },
                }}
              >
                {otp.map((digit, index) => (
                  <motion.input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    inputMode="numeric"
                    value={digit}
                    onChange={(e) => handleOtpChange(e, index)}
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    className="h-[50px] w-[50px] rounded-xl border border-gray-300 text-center text-lg outline-none focus:border-[#213732]"
                  />
                ))}
              </motion.div>

              {/* RESEND */}
              <div className="mt-4 flex justify-center">
                <motion.button
                  onClick={handleResendOtp}
                  disabled={resendTimer > 0 || resendLoading}
                  whileHover={resendTimer === 0 ? { scale: 1.05 } : {}}
                  whileTap={resendTimer === 0 ? { scale: 0.95 } : {}}
                  className={`text-sm font-medium ${
                    resendTimer > 0
                      ? "cursor-not-allowed text-gray-400"
                      : "text-[#213732] hover:underline"
                  }`}
                >
                  {resendLoading
                    ? "Resending..."
                    : resendTimer > 0
                      ? `Resend OTP in ${resendTimer}s`
                      : "Resend OTP"}
                </motion.button>
              </div>

              {/* VERIFY BUTTON */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSubmit}
                className="mt-6 h-[50px] w-full rounded-xl bg-[#213732] font-semibold text-white"
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="mx-auto h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                  />
                ) : (
                  "Verify OTP"
                )}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RegisterOTPVerification;
