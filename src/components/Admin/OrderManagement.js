import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${config.apiBaseUrl}api/admin/orders`, {
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

    return (
        <div>
            <h3>Manage Orders</h3>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>Order ID: {order.id}, Total: ${order.total_price}</li>
                ))}
            </ul>
        </div>
    );
};

export default OrderManagement;
