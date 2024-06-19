// src/context/AdminAuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get(`${config.apiBaseUrl}/api/admin/detail`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUser(response.data);
                } catch (error) {
                    console.error('Error fetching user:', error);
                }
            }
            setLoading(false);
        };
        fetchUser();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AdminAuthContext.Provider value={{ user, setUser }}>
            {children}
        </AdminAuthContext.Provider>
    );
};
