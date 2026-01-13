import React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { MdDeleteOutline } from "react-icons/md"
import { IoCloseSharp } from "react-icons/io5"

const DeleteConfirmModal = ({
  open,
  onClose,
  onConfirm,
  loading = false,
  title = "Delete Admin",
  description = "Are you sure you want to delete this admin? This action cannot be undone."
}) => {
  if (!open) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 30 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-[90%] max-w-[400px] rounded-2xl bg-white p-6 shadow-2xl"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 transition"
          >
            <IoCloseSharp size={18} />
          </button>

          {/* Icon */}
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-50 mx-auto mb-4">
            <MdDeleteOutline size={28} className="text-red-500" />
          </div>

          {/* Text */}
          <h2 className="text-center text-[20px] font-semibold text-gray-800 mb-2">
            {title}
          </h2>
          <p className="text-center text-sm text-gray-500 mb-6">
            {description}
          </p>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              type="button"
              className="w-full py-2.5 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
              disabled={loading}
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              type="button"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-red-500 text-white font-semibold shadow-md hover:bg-red-600 transition disabled:opacity-60"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mx-auto"
                />
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default DeleteConfirmModal
