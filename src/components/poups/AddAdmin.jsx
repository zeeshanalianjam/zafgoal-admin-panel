import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoCloseSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { handleApiError } from "../../utils/handleApiError";
import { Axios } from "../../common/Axios";
import { summaryApi } from "../../common/summaryApi";
import toast from "react-hot-toast";

const PERMISSIONS_LIST = [
  { label: "Dashboard", value: "dashboard" },
  { label: "Expense", value: "expense" },
  { label: "Products", value: "products" },
  { label: "Inventory", value: "inventory" },
  { label: "Orders", value: "orders" },
];

const AddAdmin = ({ setAddAdmin, handleSubmit, handleChange, addAdminData, handlePermissionAdd, handlePermissionRemove, loading }) => {


  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.form
          onSubmit={handleSubmit}
          initial={{ scale: 0.8, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 30 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-[90%] max-w-[420px] rounded-2xl space-y-4 bg-white p-6 shadow-xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-[24px] font-semibold text-[#213732]">
              Add Admin
            </h2>

            <button
              type="button"
              onClick={() => setAddAdmin(false)}
              className="rounded-full p-2 hover:bg-gray-100"
            >
              <IoCloseSharp size={20} />
            </button>
          </div>

          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Name</label>
            <input
              value={addAdminData.name}
              onChange={handleChange}
              type="text"
              name="name"
              className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#213732]"
              placeholder="Enter admin name"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Email</label>
            <input
              value={addAdminData.email}
              onChange={handleChange}
              type="email"
              name="email"
              className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#213732]"
              placeholder="Enter admin email"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Password</label>
            <input
              value={addAdminData.password}
              onChange={handleChange}
              type="password"
              name="password"
              className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#213732]"
              placeholder="Enter admin password"
              required
            />
          </div>

          {/* Permissions Select */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Permissions</label>

            <select
              onChange={handlePermissionAdd}
              defaultValue=""
              className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#213732]"
            >
              <option value="" disabled>
                Select permission
              </option>
              {PERMISSIONS_LIST.map((perm) => (
                <option key={perm.value} value={perm.value}>
                  {perm.label}
                </option>
              ))}
            </select>

            {/* Selected Permissions */}
            {addAdminData.permissions.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {addAdminData.permissions.map((perm) => (
                  <div
                    key={perm}
                    className="flex items-center gap-2 bg-[#213732] text-white px-3 py-1 rounded-full text-sm"
                  >
                    <span className="capitalize">{perm}</span>
                    <button
                      type="button"
                      onClick={() => handlePermissionRemove(perm)}
                      className="hover:text-red-300 transition"
                    >
                      <MdDelete size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-[14px] py-2 bg-[#213732] text-white shadow-md hover:bg-[#295c57] transition-all disabled:opacity-60"
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mx-auto"
              />
            ) : (
              "Add Admin"
            )}
          </button>
        </motion.form>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddAdmin;
