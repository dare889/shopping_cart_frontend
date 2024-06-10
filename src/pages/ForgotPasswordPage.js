import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add logic to handle forgot password (e.g., send email to reset password)
        console.log('Forgot password form submitted');
        console.log('Email:', email);
    };

    return (
        <div className="container mt-5">
            <h2>Forget Password</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div className="mt-3">
                <Link to="/login" className="btn btn-link">Back to Login</Link>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
