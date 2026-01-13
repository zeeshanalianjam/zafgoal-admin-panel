import React, { useEffect, useState } from "react";
import AdminManageCard from "../../components/AdminManageCard";
import { FaWallet, FaFileAlt, FaGlobe, FaShoppingCart } from "react-icons/fa";
import ProfileInfoCard from "../../components/ProfileInfoCard";
import FeatureSettingsCard from "../../components/FeatureSettingsCard";
import StockAvailability from "../../components/StockAvailability";
import StocksDetails from "../../components/StocksDetails";
import AddAdmin from "../../components/poups/AddAdmin";
import AdminsTable from "../../components/AdminsTable";
import { Axios } from '../../common/Axios'
import { summaryApi } from '../../common/summaryApi'
import { handleApiError } from '../../utils/handleApiError'
import EditAdmin from "../../components/poups/EditAdmin";
import toast from "react-hot-toast";
import DeleteConfirmModal from "../../components/poups/DeleteConfirmModal";

const AdminManage = () => {
  // stocks state
  const [stockOpen, setStockOpen] = React.useState(true);
  const [addAdmin, setAddAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  // Edit admin states
  const [editAdminOpen, setEditAdminOpen] = useState(false)
  const [editAdminData, setEditAdminData] = useState({
    _id: '',
    name: '',
    email: '',
    password: '',
    permissions: []
  })
  const [originalPermissions, setOriginalPermissions] = useState([])




  // ----------------------------
  // admin table data for adminTable component
  const [data, setData] = useState([])

  const getAllAdmins = async () => {
    try {
      const response = await Axios({
        ...summaryApi.getAllAdmins,
      })

      if (response.data.success) {
        setData(response.data.data)
      }
    } catch (error) {
      handleApiError(error)
    }
  }

  useEffect(() => {
    getAllAdmins()
  }, [])
  // ----------------------------


  // ----------------------------
  // add admin data for addAdmin component
  const [addAdminData, setAddAdminData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Admin",
    permissions: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddAdminData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle permission select (ADD to array)
  const handlePermissionAdd = (e) => {
    const value = e.target.value;

    if (!value) return;

    setAddAdminData((prev) => {
      // prevent duplicates
      if (prev.permissions.includes(value)) return prev;

      return {
        ...prev,
        permissions: [...prev.permissions, value],
      };
    });
  };

  // remove permission
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
        ...summaryApi.register,
        data: addAdminData,
      });

      if (response.data.success) {
        setAddAdminData({
          name: "",
          email: "",
          password: "",
          role: "Admin",
          permissions: [],
        });
        getAllAdmins();
        setAddAdmin(false);
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };
  // ----------------------------


  // ----------------------------
  // admin edit logic
  const handleEdit = (admin) => {
    console.log('Edit admin:', admin)
    setEditAdminData({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      password: '',
      permissions: admin.permissions || []
    })

    setOriginalPermissions(admin.permissions || [])
    setEditAdminOpen(true)
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditAdminData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleEditPermissionAdd = (e) => {
    const value = e.target.value

    setEditAdminData(prev => {
      if (prev.permissions.includes(value)) return prev

      return {
        ...prev,
        permissions: [...prev.permissions, value]
      }
    })
  }

  const handleEditPermissionRemove = (perm) => {
    setEditAdminData(prev => ({
      ...prev,
      permissions: prev.permissions.filter(p => p !== perm)
    }))
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // ---------------- DIFF LOGIC ----------------
      const addPermissions = editAdminData.permissions.filter(
        perm => !originalPermissions.includes(perm)
      )

      const removePermissions = originalPermissions.filter(
        perm => !editAdminData.permissions.includes(perm)
      )

      const payload = {
        name: editAdminData.name,
        email: editAdminData.email,
        password: editAdminData.password,
        addPermissions,
        removePermissions
      }

      const response = await Axios({
        ...summaryApi.updateAdminDetails(editAdminData._id),
        data: payload
      })

      if (response.data.success) {
        toast.success('Admin updated successfully')
        setEditAdminOpen(false)
        getAllAdmins() // 🔥 TABLE REFRESH
      }
    } catch (error) {
      handleApiError(error)
    } finally {
      setLoading(false)
    }
  }
  // ----------------------------



  // ----------------------------
  // admin delete logic
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedAdminId, setSelectedAdminId] = useState(null)
  


  const handleDeleteClick = (adminId) => {
    setSelectedAdminId(adminId)
    setDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!selectedAdminId) return

    setLoading(true)
    try {
      const response = await Axios({
        ...summaryApi.deleteAdmin(selectedAdminId),
      })

      if (response.data.success) {
        toast.success(response.data.message)
        setDeleteModalOpen(false)
        setSelectedAdminId(null)
        getAllAdmins() // 🔥 refresh table
      }
    } catch (error) {
      handleApiError(error)
    } finally {
      setLoading(false)
    }
  }
  // ----------------------------





  return (
    <div className="pt-16 space-y-10">
      {/* header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Admin Management</h1>
        <button
          onClick={() => setAddAdmin(true)}
          className="px-4 py-2 text-white bg-[#213732] rounded-md"
        >
          Add Admin
        </button>
      </div>


      {/* cards */}
      {/* <div className=' flex justify-between  items-center gap-[10px]'>
        <AdminManageCard name="Inventory Admin" Icon={FaWallet} isActive="true" />
        <AdminManageCard name="Content & Merchandising Admin" Icon={FaFileAlt} />
        <AdminManageCard name="Sales Admin" Icon={FaGlobe} />
        <AdminManageCard name="customer management" Icon={FaShoppingCart} />

      </div> */}

      {/* profile info & feature control */}
      {/* <div className="flex items-center justify-between gap-2">
        <ProfileInfoCard />
        <FeatureSettingsCard label="" />
      </div> */}

      <div className="space-y-4">
        {/* stocks availability & out of stock */}
        <div className="flex items-center justify-between gap-2">
          {/* <StockAvailability stockOpen={stockOpen} setStockOpen={setStockOpen} />
          <StockAvailability /> */}
        </div>

        {/* stocks details */}
        <div>{/* <StocksDetails /> */}</div>
      </div>


      {/* -------------------------------------- */}
      {/* new admin updated data */}

      {/* admins table */}
      <div>
        <AdminsTable data={data} handleEdit={handleEdit} handleDelete={handleDeleteClick} />
      </div>


      {/* add admin  */}
      {addAdmin && <AddAdmin setAddAdmin={setAddAdmin} handleSubmit={handleSubmit} handleChange={handleChange} addAdminData={addAdminData} handlePermissionAdd={handlePermissionAdd} handlePermissionRemove={handlePermissionRemove} loading={loading} />}


      {/* update admin details */}
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

    </div>
  );
};

export default AdminManage;
