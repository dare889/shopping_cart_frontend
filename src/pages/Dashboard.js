// src/pages/Dashboard.js
import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config'; // Ensure this file exists and has the correct API base URL
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
    const { user, setUser } = useContext(AuthContext); // Use AuthContext to get user info
    const [orders, setOrders] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [updatedInfo, setUpdatedInfo] = useState({
        username: '',
        email: ''
    });

    useEffect(() => {
        if (user) {
            setUpdatedInfo({
                username: user.username,
                email: user.email
            });
        }
    }, [user]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${config.apiBaseUrl}/api/orders`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${config.apiBaseUrl}/api/auth/user`, updatedInfo, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUser(response.data);
            setEditMode(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Welcome to your Dashboard</h2>
            <p>This is a protected route. Only authenticated users can see this.</p>
            
            <div className="mt-4">
                <h3>User Information</h3>
                {editMode ? (
                    <form onSubmit={handleUpdateProfile}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username:</label>
                            <input 
                                type="text" 
                                id="username" 
                                className="form-control" 
                                value={updatedInfo.username} 
                                onChange={(e) => setUpdatedInfo({ ...updatedInfo, username: e.target.value })} 
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input 
                                type="email" 
                                id="email" 
                                className="form-control" 
                                value={updatedInfo.email} 
                                onChange={(e) => setUpdatedInfo({ ...updatedInfo, email: e.target.value })} 
                                required 
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Save</button>
                        <button type="button" className="btn btn-secondary ms-3" onClick={() => setEditMode(false)}>Cancel</button>
                    </form>
                ) : (
                    <div>
                        <p><strong>Username:</strong> {user && user.username}</p>
                        <p><strong>Email:</strong> {user && user.email}</p>
                        <button className="btn btn-primary" onClick={() => setEditMode(true)}>Edit Profile</button>
                    </div>
                )}
            </div>

            <div className="mt-4">
                <h3>Your Orders</h3>
                {orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    <ul className="list-group">
                        {orders.map(order => (
                            <li key={order.id} className="list-group-item">
                                <p><strong>Order ID:</strong> {order.id}</p>
                                <p><strong>Total:</strong> ${order.total}</p>
                                <p><strong>Status:</strong> {order.status}</p>
                                <p><strong>Items:</strong></p>
                                <ul>
                                    {order.items.map(item => (
                                        <li key={item.id}>{item.name} - ${item.price} x {item.quantity}</li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
