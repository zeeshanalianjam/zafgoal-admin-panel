import { motion } from "framer-motion";
import { FiEdit, FiTrash2, FiLock } from "react-icons/fi";

const users = [
  {
    id: 1,
    name: "Zee",
    email: "zeeshanalianjam49@gmail.com",
    role: "Admin",
    permissions: ["Products", "Expense"],
    status: "Active",
  },
];

export default function UserManagement() {
  return (
    <div className="pt-16 space-y-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <h1 className="text-2xl font-semibold">User Management</h1>
          <p className="text-gray-500 text-sm">
            Manage users, roles & permissions
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#213732] text-white px-4 py-2 rounded-xl"
        >
          + Add User
        </motion.button>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl shadow-sm overflow-hidden"
      >
        <table className="w-full">
          <thead className="bg-gray-50 text-sm text-gray-600">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Permissions</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-4 font-medium">{user.name}</td>
                <td className="p-4 text-gray-600">{user.email}</td>
                <td className="p-4">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">
                    {user.role}
                  </span>
                </td>
                <td className="p-4 flex gap-2 flex-wrap">
                  {user.permissions.map((p) => (
                    <span
                      key={p}
                      className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700"
                    >
                      {p}
                    </span>
                  ))}
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      user.status === "Active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex justify-center gap-3">
                    <motion.button whileHover={{ scale: 1.2 }}>
                      <FiEdit className="text-blue-600" />
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.2 }}>
                      <FiLock className="text-yellow-600" />
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.2 }}>
                      <FiTrash2 className="text-red-600" />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
