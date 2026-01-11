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
import AdminPrivateRoute from "./privateRoutes/AdminPrivateRoute";
import NotFound from "./pages/NotFound";


export default function App() {
  return (
    <>
      <Routes >
        {/* admin login */}
        <Route path="/" element={<AdminLogin />} />

        {/* super admin login */}
        <Route path="/super-admin/login" element={<SuperAdminLogin />} />

        {/* admin dashboard layout */}
        <Route path="/admin" element={<AdminPrivateRoute> <AdminLayout /> </AdminPrivateRoute>} >
          <Route path="dashboard" element={< SuperAdminDashboard />} />
          <Route path="admin-management" element={<AdminManage />} />
          <Route path="expense" element={<Expense />} />
          <Route path="products" element={<Products />} />
          <Route path="products/inventory" element={<Inventory />} />
          <Route path="products/orders" element={<Orders />} />

        </Route>

        {/* super admin dashboard layout */}
        <Route path="/super-admin" element={<SuperAdminPrivateRoute> <SuperAdminLayout /> </SuperAdminPrivateRoute>} >
          <Route path="dashboard" element={<SuperAdminDashboard />} />
        </Route>

        {/* not found route */}
        <Route path="*" element={<NotFound />} />

        {/* toaster notification */}
      </Routes>
      <Toaster />
    </>
  )
}