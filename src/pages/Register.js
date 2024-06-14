import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure axios is installed and imported
import config from '../config'; // Import the configuration file

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false); // State to track registration success
    const navigate = useNavigate(); // Hook to navigate

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post(`${config.apiBaseUrl}api/auth/register`, { username, email, password });
            console.log('Registration successful:', response.data);
            setSuccess(true); // Set success to true
            setError(''); // Clear any existing errors
        } catch (error) {
            setError('Registration failed');
            console.error('Registration error:', error);
        }
    };

    // Use useEffect to handle the redirection after successful registration
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                navigate('/login'); // Redirect to login page after 3 seconds
            }, 3000);

            return () => clearTimeout(timer); // Cleanup the timer on component unmount
        }
    }, [success, navigate]);

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Register</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">Registration successful! Redirecting to login...</div>}
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
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        className="form-control" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
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
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                    <input 
                        type="password" 
                        id="confirmPassword" 
                        className="form-control" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
            <div className="mt-3">
                <Link to="/login" className="btn btn-link">Back to Login</Link>
            </div>
        </div>
    );
};

export default Register;
