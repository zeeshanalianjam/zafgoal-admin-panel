import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoCloseSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

const EditUser = ({
  setEditUserOpen,
  handleEditSubmit,
  handleEditChange,
  editUserData,
  loading,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.form
          onSubmit={handleEditSubmit}
          initial={{ scale: 0.85, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 40 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-[92%] max-w-[460px] rounded-2xl bg-white p-6 shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[22px] font-semibold text-gray-800">
              Edit User
            </h2>

            <button
              type="button"
              onClick={() => setEditUserOpen(false)}
              className="rounded-full p-2 hover:bg-gray-100 transition"
            >
              <IoCloseSharp size={20} />
            </button>
          </div>

          {/* Avatar */}
          <div className="flex justify-center mb-4">
            <motion.label
              whileHover={{ scale: 1.05 }}
              className="relative cursor-pointer"
            >
              <motion.div
                key={editUserData.avatarPreview}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#213732] shadow-md flex items-center justify-center bg-gray-100"
              >
                {editUserData.avatarPreview ? (
                  <img
                    src={editUserData.avatarPreview}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-semibold text-gray-500">
                    {editUserData.name?.charAt(0)?.toUpperCase() || "U"}
                  </span>
                )}
              </motion.div>

              {/* Hidden input */}
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleEditChange}
                className="hidden"
              />

              {/* Camera hint */}
              <span className="absolute bottom-0 right-0 bg-[#213732] text-white text-xs px-2 py-0.5 rounded-full">
                Edit
              </span>
            </motion.label>
          </div>

          {/* Name */}
          <div className="flex flex-col gap-1 mb-3">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              value={editUserData.name}
              onChange={handleEditChange}
              type="text"
              name="name"
              className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#213732]"
              placeholder="Enter user name"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1 mb-3">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              value={editUserData.email}
              onChange={handleEditChange}
              type="email"
              name="email"
              className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#213732]"
              placeholder="Enter user email"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm font-medium text-gray-700">
              Password <span className="text-xs text-gray-400">(optional)</span>
            </label>
            <input
              value={editUserData.password}
              onChange={handleEditChange}
              type="password"
              name="password"
              className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#213732]"
              placeholder="Leave empty to keep current password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl py-2.5 bg-[#213732] text-white font-semibold shadow-md hover:bg-[#295c57] transition-all disabled:opacity-60"
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mx-auto"
              />
            ) : (
              "Update User"
            )}
          </button>
        </motion.form>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditUser;
