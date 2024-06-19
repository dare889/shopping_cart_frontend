import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import ProductManagement from './ProductManagement';
import OrderManagement from './OrderManagement';
import UserManagement from './UserManagement';

const AdminDashboard = () => {
    return (
        <div className="container mt-5">
            <h2>Admin Dashboard</h2>
            <nav>
                <ul>
                    <li><Link to="/admin/products">Manage Products</Link></li>
                    <li><Link to="/admin/orders">Manage Orders</Link></li>
                    <li><Link to="/admin/users">Manage Users</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/admin/products" element={<ProductManagement />} />
                <Route path="/admin/orders" element={<OrderManagement />} />
                <Route path="/admin/users" element={<UserManagement />} />
            </Routes>
        </div>
    );
};

export default AdminDashboard;
