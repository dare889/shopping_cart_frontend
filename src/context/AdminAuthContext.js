// /context/AdminAuthContext.js
import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminAuthContext = createContext();

export const useAdminAuth = () => {
    return useContext(AdminAuthContext);
};

export const AdminAuthProvider = ({ children }) => {
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
    const navigate = useNavigate();

    const loginAdmin = () => {
        setIsAdminAuthenticated(true);
        navigate('/admin/adminPage'); // Redirect to the admin page after successful login
    };

    const logoutAdmin = () => {
        setIsAdminAuthenticated(false);
        navigate('/admin/login'); // Redirect to the admin login page after logout
    };

    return (
        <AdminAuthContext.Provider value={{ isAdminAuthenticated, loginAdmin, logoutAdmin }}>
            {children}
        </AdminAuthContext.Provider>
    );
};
