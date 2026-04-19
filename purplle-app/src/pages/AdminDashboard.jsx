import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/adminDashboard.css";

function AdminDashboard(){
    const navigate = useNavigate();

return(
    <div className="adminDashboard">
        <p>Admin Dashboard</p>
        <div className="button-group">
            <button onClick={() => navigate("/admin/productAdd")}>Add Product</button>
            <button onClick={() => navigate("/admin/manageProduct")}>Manage Product</button>
            <button onClick={() => navigate("/admin/manageUsers")}>Manage Users</button>
            <button onClick={() => navigate("/admin/orders")}>Manage User Orders</button>
            <button onClick={() => navigate("/admin/addCarousel")}>Add Carousel</button>
            <button onClick={() => navigate("/admin/addBanner")}>Add Banner</button>
        </div>
    </div>

);

};


export default AdminDashboard;