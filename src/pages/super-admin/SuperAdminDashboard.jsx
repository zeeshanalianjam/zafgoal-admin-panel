import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DashboardCard from "../../components/DashboardCard";
import DashboardLineChart from "../../components/DashboardAreaChart";
import { Axios } from "../../common/Axios";
import { summaryApi } from "../../common/summaryApi";
import { handleApiError } from "../../utils/handleApiError";
import {
  FaWallet,
  FaFileAlt,
  FaGlobe,
  FaShoppingCart,
} from "react-icons/fa";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const SuperAdminDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [users, setUsers] = useState({});

  const isPositiveTodaySales = (data.todayPercentage ?? 0) >= 0;
  const isPositiveTotalSales = (data.totalPercentage ?? 0) >= 0;

  const isPositiveTodayUsers = (users.todayPercentage ?? 0) >= 0;
  const isPositiveTotalUsers = (users.totalPercentage ?? 0) >= 0;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const [salesRes, usersRes] = await Promise.all([
          Axios({ ...summaryApi.orderSales }),
          Axios({ ...summaryApi.getAllUsers }),
        ]);

        if (salesRes.data.success) {
          setData(salesRes.data.data);
        }

        if (usersRes.data.success) {
          setUsers(usersRes.data.data);
        }
      } catch (error) {
        handleApiError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <motion.div
      className="pt-16 space-y-14"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1"
      >
        <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
        <p className="text-sm text-gray-500">
          Sales & users performance summary
        </p>
      </motion.div>

      {/* ================= STATS CARDS ================= */}
      <motion.div
        className="flex flex-wrap justify-between gap-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <DashboardCard
            name="Today Sales"
            amountIn={data.todaySales}
            Icon={FaWallet}
            percentage={data.todayPercentage}
            isPositive={isPositiveTodaySales}
            loading={loading}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <DashboardCard
            name="Total Sales"
            amountIn={data.totalSales}
            Icon={FaFileAlt}
            percentage={data.totalPercentage}
            isPositive={isPositiveTotalSales}
            loading={loading}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <DashboardCard
            name="Today Clients"
            amountIn={users.todayUsers}
            Icon={FaGlobe}
            percentage={users.todayPercentage}
            isPositive={isPositiveTodayUsers}
            loading={loading}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <DashboardCard
            name="Total Clients"
            amountIn={users.totalUsers}
            Icon={FaShoppingCart}
            percentage={users.totalPercentage}
            isPositive={isPositiveTotalUsers}
            loading={loading}
          />
        </motion.div>
      </motion.div>

      {/* ================= CHART ================= */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="rounded-2xl bg-white p-6 shadow-sm"
      >
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Sales Analytics</h2>
          <p className="text-sm text-gray-500">
            Monthly sales performance overview
          </p>
        </div>

        <DashboardLineChart />
      </motion.div>
    </motion.div>
  );
};

export default SuperAdminDashboard;
