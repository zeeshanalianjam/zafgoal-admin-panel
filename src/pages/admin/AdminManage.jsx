import React, { useState } from "react";
import AdminManageCard from "../../components/AdminManageCard";
import { FaWallet, FaFileAlt, FaGlobe, FaShoppingCart } from "react-icons/fa";
import ProfileInfoCard from "../../components/ProfileInfoCard";
import FeatureSettingsCard from "../../components/FeatureSettingsCard";
import StockAvailability from "../../components/StockAvailability";
import StocksDetails from "../../components/StocksDetails";
import AddAdmin from "../../components/poups/AddAdmin";

const AdminManage = () => {
  // stocks state
  const [stockOpen, setStockOpen] = React.useState(true);
  const [addAdmin, setAddAdmin] = useState(false);

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

      {addAdmin && <AddAdmin setAddAdmin={setAddAdmin} />}
    </div>
  );
};

export default AdminManage;
