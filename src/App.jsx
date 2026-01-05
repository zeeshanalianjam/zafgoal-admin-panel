import { Route, Routes } from "react-router-dom";
import AdminLogin from "./pages/admin/AdminLogin";
import SuperAdminLogin from "./pages/super-admin/SuperAdminLogin";
import AdminLayout from "./layouts/AdminLayout";
import SuperAdminPrivateRoute from "./privateRoutes/SuperAdminPrivateRoute";
import SuperAdminDashboard from "./pages/super-admin/SuperAdminDashboard";
import SuperAdminLayout from "./layouts/SuperAdminLayout";
import AdminManage from "./pages/admin/AdminManage";
import Expense from "./pages/Expense";
import Products from "./pages/Products";
import Inventory from "./pages/Inventory";
import Orders from "./pages/Orders";
import { Toaster } from "react-hot-toast";


export default function App() {
  return (
    <>
      <Routes >
        {/* admin routes */}
        <Route path="/" element={<AdminLogin />} />

        {/* super admin routes */}
        <Route path="/super-admin">
          <Route path="login" element={<SuperAdminLogin />} />
        </Route>

        {/* admin dashboard layout */}
        <Route path="/admin" element={<AdminLayout />} >
          <Route path="dashboard" element={< SuperAdminDashboard />} />
          <Route path="admin-management" element={<AdminManage />} />
          <Route path="expense" element={<Expense />} />


          <Route path="products" element={<Products />} />
          <Route path="products/inventory" element={<Inventory />} />
          <Route path="products/orders" element={<Orders />} />

        </Route>

        {/* super admin dashboard layout */}
        <Route path="/super-admin" element={<SuperAdminLayout />} >
          <Route path="dashboard" element={<SuperAdminDashboard />} />
        </Route>

        {/* toaster notification */}
      </Routes>
      <Toaster />
    </>
  )
}