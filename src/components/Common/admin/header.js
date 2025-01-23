import React from 'react';

const AdminHeader = () => {
    return (
        <header>
            <h1>Admin Dashboard</h1>
            <nav>
                {/* Admin-specific navigation links */}
                <a href="/admin/adminPage">Admin Home</a>
                {/* Add more links as needed */}
            </nav>
        </header>
    );
};

export default AdminHeader;
