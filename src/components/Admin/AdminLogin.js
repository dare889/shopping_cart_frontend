import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../../config';
import { AdminAuthContext } from '../../context/AdminAuthContext';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(AdminAuthContext); // Access the setUser function from AdminAuthContext

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${config.apiBaseUrl}/api/admin/login`, { username, password });
            const { access_token } = response.data;
            localStorage.setItem('token', access_token); // Save the token in localStorage

            // Fetch user details to set in the context
            const userResponse = await axios.get(`${config.apiBaseUrl}/api/admin/detail`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            });

            const userData = userResponse.data;
            if (userData.admin_type) {
                setUser(userData); // Update the user context with the admin user data
                navigate('/admin/dashboard'); // Redirect to admin dashboard after successful login
            } else {
                setError('You are not authorized to access this page.');
            }
        } catch (error) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Admin Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username:</label>
                    <input 
                        type="text" 
                        id="username" 
                        className="form-control" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        className="form-control" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;
