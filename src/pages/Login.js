import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import config from '../config'; // Import the configuration file

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${config.apiBaseUrl}api/auth/login`, { username, password });
            localStorage.setItem('token', response.data.access_token); // Assuming the token is in response.data.access_token
            navigate('/dashboard'); // Redirect to dashboard after successful login
        } catch (error) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Login</h2>
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
            <div className="mt-3">
                <Link to="/forget-password" className="btn btn-link">Forgot Password?</Link>
                <Link to="/register" className="btn btn-link">Register</Link>
            </div>
        </div>
    );
};

export default Login;
