import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AdminsTable from "../../components/AdminsTable";
import AddAdmin from "../../components/poups/AddAdmin";
import EditAdmin from "../../components/poups/EditAdmin";
import DeleteConfirmModal from "../../components/poups/DeleteConfirmModal";
import RegisterOTPVerification from "../../components/poups/RegisterOTPVerification";
import { Axios } from "../../common/Axios";
import { summaryApi } from "../../common/summaryApi";
import { handleApiError } from "../../utils/handleApiError";
import toast from "react-hot-toast";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

const AdminManage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [addAdmin, setAddAdmin] = useState(false);
  const [editAdminOpen, setEditAdminOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [otpVerify, setOtpVerify] = useState(false);

  const [selectedAdminId, setSelectedAdminId] = useState(null);

  /* ================= FETCH ADMINS ================= */
  const getAllAdmins = async () => {
    try {
      const response = await Axios({ ...summaryApi.getAllAdmins });
      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  useEffect(() => {
    getAllAdmins();
  }, []);

  /* ================= ADD ADMIN ================= */
  const [addAdminData, setAddAdminData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Admin",
    permissions: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddAdminData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePermissionAdd = (e) => {
    const value = e.target.value;
    if (!value) return;

    setAddAdminData((prev) =>
      prev.permissions.includes(value)
        ? prev
        : { ...prev, permissions: [...prev.permissions, value] },
    );
  };

  const handlePermissionRemove = (perm) => {
    setAddAdminData((prev) => ({
      ...prev,
      permissions: prev.permissions.filter((p) => p !== perm),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addAdminData.permissions.length === 0) {
      toast.error("Please select at least one permission");
      return;
    }

    try {
      setLoading(true);
      const response = await Axios({
        ...summaryApi.pendingRegister,
        data: addAdminData,
      });

      if (response.data.success) {
        toast.success("Admin invitation sent");
        setAddAdmin(false);
        setAddAdminData({
          name: "",
          email: "",
          password: "",
          role: "Admin",
          permissions: [],
        });
        getAllAdmins();
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= EDIT ADMIN ================= */
  const [editAdminData, setEditAdminData] = useState({
    _id: "",
    name: "",
    email: "",
    password: "",
    permissions: [],
  });

  const [originalPermissions, setOriginalPermissions] = useState([]);

  const handleEdit = (admin) => {
    setEditAdminData({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      password: "",
      permissions: admin.permissions || [],
    });
    setOriginalPermissions(admin.permissions || []);
    setEditAdminOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditAdminData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditPermissionAdd = (e) => {
    const value = e.target.value;
    setEditAdminData((prev) =>
      prev.permissions.includes(value)
        ? prev
        : { ...prev, permissions: [...prev.permissions, value] },
    );
  };

  const handleEditPermissionRemove = (perm) => {
    setEditAdminData((prev) => ({
      ...prev,
      permissions: prev.permissions.filter((p) => p !== perm),
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const addPermissions = editAdminData.permissions.filter(
        (p) => !originalPermissions.includes(p),
      );
      const removePermissions = originalPermissions.filter(
        (p) => !editAdminData.permissions.includes(p),
      );

      const payload = {
        name: editAdminData.name,
        email: editAdminData.email,
        password: editAdminData.password,
        addPermissions,
        removePermissions,
      };

      const response = await Axios({
        ...summaryApi.updateAdminDetails(editAdminData._id),
        data: payload,
      });

      if (response.data.success) {
        toast.success("Admin updated successfully");
        setEditAdminOpen(false);
        getAllAdmins();
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ADMIN ================= */
  const handleDeleteClick = (id) => {
    setSelectedAdminId(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedAdminId) return;

    try {
      setLoading(true);
      const response = await Axios({
        ...summaryApi.deleteAdmin(selectedAdminId),
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setDeleteModalOpen(false);
        getAllAdmins();
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="pt-16 space-y-10"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-semibold">Admin Management</h1>
          <p className="text-sm text-gray-500">
            Manage admins, roles & permissions
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setAddAdmin(true)}
          className="px-5 py-2 rounded-xl bg-[#213732] text-white font-medium"
        >
          + Add Admin
        </motion.button>
      </motion.div>

      {/* ================= TABLE ================= */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="rounded-2xl bg-white shadow-sm p-4"
      >
        <motion.div variants={item}>
          <AdminsTable
            data={data}
            handleEdit={handleEdit}
            handleDelete={handleDeleteClick}
          />
        </motion.div>
      </motion.div>

      {/* ================= MODALS ================= */}
      {addAdmin && (
        <AddAdmin
          setAddAdmin={setAddAdmin}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          addAdminData={addAdminData}
          handlePermissionAdd={handlePermissionAdd}
          handlePermissionRemove={handlePermissionRemove}
          loading={loading}
        />
      )}

      <RegisterOTPVerification
        otpVerify={otpVerify}
        setOtpVerify={setOtpVerify}
      />

      {editAdminOpen && (
        <EditAdmin
          setEditAdminOpen={setEditAdminOpen}
          handleEditSubmit={handleEditSubmit}
          handleEditChange={handleEditChange}
          editAdminData={editAdminData}
          handleEditPermissionAdd={handleEditPermissionAdd}
          handleEditPermissionRemove={handleEditPermissionRemove}
          loading={loading}
        />
      )}

      <DeleteConfirmModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={loading}
      />
    </motion.div>
  );
};

export default AdminManage;
