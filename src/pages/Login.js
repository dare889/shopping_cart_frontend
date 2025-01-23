import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import config from '../config';
import '../assets/css/Login.css'; // Make sure to create this CSS file for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${config.backendUrl}/api/login`, {
        email,
        password
      });

      setSuccess(response.data.message);
      localStorage.setItem('token', response.data.token);
      setError('');

      const redirectTo = location.state?.from || '/dashboard';
      navigate(redirectTo);

    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
      setSuccess('');
    }
  };

  return (
    <div className="auth-container container px-4 px-lg-5">
      <div className="register-section">
        <h2>用戶註冊</h2>
        <p>註冊賬戶</p>
        <p>
          註冊一個賬戶以便您更快捷地購物，查看訂購狀態，查詢訂購記錄，
          和更多的管理項目。
        </p>
        <Link to="/register" className="btn btn-primary">繼續</Link>
      </div>
      <div className="login-section">
        <h2>會員登錄</h2>
        <p>如果您已經是本站會員，請直接登錄。</p>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>郵箱地址</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>密碼</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <Link to="/forget-password" className="forgot-password-link">忘記密碼？</Link>
          </div>
          <button type="submit" className="btn btn-primary">登錄</button>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
