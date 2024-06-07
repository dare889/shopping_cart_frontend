import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboardPage = () => {
    const [userStats, setUserStats] = useState({});
    const [productStats, setProductStats] = useState({});

    useEffect(() => {
        // Fetch user statistics from the backend when the component mounts
        const fetchUserStats = async () => {
            try {
                const response = await axios.get('/api/admin/userStats');
                setUserStats(response.data);
            } catch (error) {
                console.error('Error fetching user statistics:', error);
            }
        };

        // Fetch product statistics from the backend when the component mounts
        const fetchProductStats = async () => {
            try {
                const response = await axios.get('/api/admin/productStats');
                setProductStats(response.data);
            } catch (error) {
                console.error('Error fetching product statistics:', error);
            }
        };

        fetchUserStats();
        fetchProductStats();
    }, []);

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <div>
                <h3>User Statistics</h3>
                <p>Total Users: {userStats.totalUsers}</p>
                <p>Active Users: {userStats.activeUsers}</p>
                <p>Pending Users: {userStats.pendingUsers}</p>
            </div>
            <div>
                <h3>Product Statistics</h3>
                <p>Total Products: {productStats.totalProducts}</p>
                <p>Active Products: {productStats.activeProducts}</p>
                <p>Inactive Products: {productStats.inactiveProducts}</p>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
