// /pages/admin/adminLoginPage.js
import React, { useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import '../../assets/css/admin/adminLoginPage.css';

const AdminLoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { loginAdmin } = useAdminAuth();

    const handleLogin = (event) => {
        event.preventDefault();
        // Placeholder for login logic, replace with your authentication logic
        if (username === 'admin' && password === 'admin123') {
            loginAdmin(); // Call the login function from AdminAuthContext
        } else {
            alert('Invalid username or password. Please try again.');
        }
    };

    return (
        <div className="admin-login-container">
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin} className="admin-login-form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="admin-login-button">Login</button>
            </form>
        </div>
    );
};

export default AdminLoginPage;
