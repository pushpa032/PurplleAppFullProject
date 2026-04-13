import React from "react";
import { Routes, Route } from "react-router-dom"; 
import LoginAdmin from "./LoginAdmin";
import AdminDashboard from "./AdminDashboard";
import ProductAdd from "./ProductAdd";
import ViewProduct from "./viewProduct";
import ManageProduct from "./ManageProduct";
import EditProduct from "./EditProduct";
import ManageUsers from "./ManageUsers";
import EditUser from "./EditUser";
import AdminManageOrders from "./AdminManageOrders";

function AdminPanel({ products, setProducts }) {
  return (
    <Routes>
      <Route path="LoginAdmin" element={<LoginAdmin />} />
      <Route path="AdminDashboard" element={<AdminDashboard />} />
      <Route
        path="productAdd"
        element={<ProductAdd products={products} setProducts={setProducts} />}
      />
      <Route
        path="viewProduct"
        element={<ViewProduct products={products} />} 
      />
      <Route
      path="manageProduct"
      element={<ManageProduct/>}
      />
      <Route
      path="editProduct/:id"
      element={<EditProduct/>}
      />
      <Route
      path="manageUsers"
      element={<ManageUsers/>}
      />
      <Route
      path="editUser/:id"
      element={<EditUser/>}
      />
      <Route
      path="orders"
      element={<AdminManageOrders/>}
      />

    </Routes>
  );
}

export default AdminPanel;