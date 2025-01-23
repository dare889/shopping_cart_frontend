import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import '../assets/css/Register.css'; // Ensure this CSS file is linked

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        telephone: '',
        password: '',
        confirmPassword: '',
        subscribe: 'no',
        agree: false
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post(`${config.backendUrl}/api/register`, formData);
            console.log('Registration successful:', response.data);
            setSuccess(true);
            setError('');
        } catch (error) {
            setError(error.response?.data?.message || 'Registration failed');
            console.error('Registration error:', error);
        }
    };

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                navigate('/login');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success, navigate]);

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <div className="register-header">
                    <h2>用戶註冊</h2>
                    <p>
                        歡迎來到我們網站，如果您是新用戶，請填寫下面的表單進行註冊。如果您已經是本站的會員，請
                        直接 <Link to="/login">登錄</Link>。
                    </p>
                </div>
                <div className="register-body">
                    <div className="register-part-left">
                        <h3>您的個人資料</h3>
                        <div className="form-group">
                            <label>您的名字 <span>*</span></label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>您的姓氏 <span>*</span></label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>電子郵箱 <span>*</span></label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>聯絡電話 <span>*</span></label>
                            <input
                                type="tel"
                                name="telephone"
                                value={formData.telephone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="register-part-right">
                        <h3>您的帳戶密碼</h3>
                        <div className="form-group">
                            <label>輸入密碼 <span>*</span></label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>確認密碼 <span>*</span></label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>選擇訂閱方式</label>
                            <div className="radio-group">
                                <label>
                                    <input
                                        type="radio"
                                        name="subscribe"
                                        value="yes"
                                        checked={formData.subscribe === 'yes'}
                                        onChange={handleChange}
                                    />
                                    是
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="subscribe"
                                        value="no"
                                        checked={formData.subscribe === 'no'}
                                        onChange={handleChange}
                                    />
                                    否
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="submit-section">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            name="agree"
                            checked={formData.agree}
                            onChange={handleChange}
                            required
                        />
                        <label>
                            我已經閱讀並同意 <Link to="/privacy-policy">隱私政策</Link>
                        </label>
                    </div>
                    <button type="submit">繼續</button>
                </div>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">Registration successful! Redirecting to login...</p>}
            </form>
        </div>
    );
};

export default Register;
