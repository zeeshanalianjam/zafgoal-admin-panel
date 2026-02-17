import React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { IoCloseSharp } from "react-icons/io5"
import { MdDelete } from "react-icons/md"

const PERMISSIONS_LIST = [
    { label: "Dashboard", value: "dashboard" },
    { label: "Expense", value: "expense" },
    { label: "Products", value: "products" },
    { label: "Inventory", value: "inventory" },
    { label: "Orders", value: "orders" },
]

const EditAdmin = ({
    setEditAdminOpen,
    handleEditSubmit,
    handleEditChange,
    editAdminData,
    handleEditPermissionAdd,
    handleEditPermissionRemove,
    loading
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
                            Edit Admin
                        </h2>

                        <button
                            type="button"
                            onClick={() => setEditAdminOpen(false)}
                            className="rounded-full p-2 hover:bg-gray-100 transition"
                        >
                            <IoCloseSharp size={20} />
                        </button>
                    </div>

                    {/* Name */}
                    <div className="flex flex-col gap-1 mb-3">
                        <label className="text-sm font-medium text-gray-700">Name</label>
                        <input
                            value={editAdminData.name}
                            onChange={handleEditChange}
                            type="text"
                            name="name"
                            className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#213732]"
                            placeholder="Enter admin name"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1 mb-3">
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <input
                            value={editAdminData.email}
                            onChange={handleEditChange}
                            type="email"
                            name="email"
                            className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#213732]"
                            placeholder="Enter admin email"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-1 mb-4">
                        <label className="text-sm font-medium text-gray-700">
                            Password <span className="text-xs text-gray-400">(optional)</span>
                        </label>
                        <input
                            value={editAdminData.password}
                            onChange={handleEditChange}
                            type="password"
                            name="password"
                            className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#213732]"
                            placeholder="Leave empty to keep current password"
                        />
                    </div>

                    {/* Permissions */}
                    <div className="flex flex-col gap-2 mb-4">
                        <label className="text-sm font-medium text-gray-700">
                            Permissions
                        </label>

                        <select
                            onChange={handleEditPermissionAdd}
                            defaultValue=""
                            className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#213732]"
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
                        {editAdminData.permissions?.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {editAdminData.permissions.map((perm) => (
                                    <div
                                        key={perm}
                                        className="flex items-center gap-2 bg-[#213732] text-white px-3 py-1 rounded-full text-xs font-semibold"
                                    >
                                        <span className="capitalize">{perm}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleEditPermissionRemove(perm)}
                                            className="hover:text-red-300 transition"
                                        >
                                            <MdDelete size={14} />
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
                        className="w-full rounded-xl py-2.5 bg-[#213732] text-white font-semibold shadow-md hover:bg-[#295c57] transition-all disabled:opacity-60"
                    >
                        {loading ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mx-auto"
                            />
                        ) : (
                            "Update Admin"
                        )}
                    </button>
                </motion.form>
            </motion.div>
        </AnimatePresence>
    )
}

export default EditAdmin
