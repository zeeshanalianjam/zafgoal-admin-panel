import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiLock } from "react-icons/fi";
import { handleApiError } from "../utils/handleApiError";
import { Axios } from "../common/Axios";
import { summaryApi } from "../common/summaryApi";
import EditUser from "./poups/EditUser";
import toast from "react-hot-toast";

const users = [
  {
    id: 1,
    name: "Zee",
    email: "zeeshanalianjam49@gmail.com",
    role: "user",
    permissions: ["Products", "Expense"],
    status: "Active",
  },
];

export default function UserManagement() {
  const [fetchUserData, setFetchUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);

  /* ================= fetch all user details ================= */
  const fetchAllUserDetails = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...summaryApi.getAllUsersDetails,
      });

      if (response.data.success) {
        setFetchUserData(response.data.data);
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {

    fetchAllUserDetails();
  }, []);

  /* ================= edit user ================= */
  const [editUserData, setEditUserData] = useState({
    _id: "",
    name: "",
    email: "",
    password: "",
    avatar: null,
    avatarPreview: "",
  });

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "avatar") {
      const file = files[0];
      setEditUserData((prev) => ({
        ...prev,
        avatar: file,
        avatarPreview: URL.createObjectURL(file),
      }));
    } else {
      setEditUserData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleEdit = (user) => {
    setEditUserData({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: "",
      avatar: null,
      avatarPreview: user.avatar,
    });
    setEditUserOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("_id", editUserData._id);
      formData.append("name", editUserData.name);
      formData.append("email", editUserData.email);
      if (editUserData.password) {
        formData.append("password", editUserData.password);
      }
      if (editUserData.avatar instanceof File) {
        formData.append("avatar", editUserData.avatar);
      }

      const response = await Axios({
        ...summaryApi.updateUsersDetails(editUserData._id),
        data: formData,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setEditUserOpen(false);
        fetchAllUserDetails();
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

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
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {fetchUserData.map((user, index) => (
              <motion.tr
                key={user._id}
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
                    <motion.button onClick={() => handleEdit(user)} whileHover={{ scale: 1.2 }}>
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


      {/* Edit User Modal */}
      {editUserOpen && (
        <EditUser
          setEditUserOpen={setEditUserOpen}
          handleEditSubmit={handleEditSubmit}
          handleEditChange={handleEditChange}
          editUserData={editUserData}
          loading={loading}
        />
      )}
    </div>
  );
}
