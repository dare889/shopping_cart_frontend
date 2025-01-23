// /components/PrivateRoute/AdminPrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';

const AdminPrivateRoute = () => {
    const { isAdminAuthenticated } = useAdminAuth();

    return isAdminAuthenticated ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default AdminPrivateRoute;
