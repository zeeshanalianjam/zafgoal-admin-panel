import React from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaExclamationCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#dfeee9] via-[#6fa29a] to-[#0b1f1d] relative overflow-hidden">

            {/* Grain overlay for texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-20 pointer-events-none" />

            {/* Glass Card */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative z-10 w-[90%] max-w-md rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-10 text-center"
            >
                {/* Icon */}
                <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
                    className="flex justify-center mb-4"
                >
                    <FaExclamationCircle className="text-[#1f3d3a] text-6xl drop-shadow-lg" />
                </motion.div>

                {/* 404 */}
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-7xl font-extrabold text-white tracking-wider mb-2"
                >
                    404
                </motion.h1>

                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl font-semibold text-white mb-2"
                >
                    Page Not Found
                </motion.h2>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-sm text-white/70 mb-8 leading-relaxed"
                >
                    The page you are trying to access does not exist or has been moved.
                    Please check the URL or return to the dashboard.
                </motion.p>

                {/* Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(-1)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#1f3d3a] text-white font-medium shadow-lg hover:bg-[#295c57] transition-all"
                >
                    <FaArrowLeft />
                    Back to Home
                </motion.button>
            </motion.div>
        </div>
    );
};

export default NotFound;
