import React from 'react';
import '../../assets/css/admin/adminPage.css';

const AdminPage = () => {
    return (
        <div className="admin-page-container">
            <h2>Admin Dashboard</h2>
            <p>Welcome to the admin dashboard. Here you can manage website content and settings.</p>

            <div className="admin-sections">
                <div className="admin-section-card">
                    <h3>User Management</h3>
                    <p>Manage users, roles, and permissions.</p>
                    <button className="admin-button" onClick={() => alert('Navigate to User Management')}>
                        Go to User Management
                    </button>
                </div>

                <div className="admin-section-card">
                    <h3>Content Management</h3>
                    <p>Update and organize website content.</p>
                    <button className="admin-button" onClick={() => alert('Navigate to Content Management')}>
                        Go to Content Management
                    </button>
                </div>

                <div className="admin-section-card">
                    <h3>Product Management</h3>
                    <p>Add, edit, and remove products.</p>
                    <button className="admin-button" onClick={() => alert('Navigate to Product Management')}>
                        Go to Product Management
                    </button>
                </div>

                <div className="admin-section-card">
                    <h3>Orders</h3>
                    <p>View and manage customer orders.</p>
                    <button className="admin-button" onClick={() => alert('Navigate to Orders')}>
                        Go to Orders
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
