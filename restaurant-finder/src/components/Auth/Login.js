import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import config from '../../config/config';
import { jwtDecode } from 'jwt-decode';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${config.services.userService}/api/user/login?email=${encodeURIComponent(
          formData.email
        )}&password=${encodeURIComponent(formData.password)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (!response.ok) throw new Error('Login failed');
      const data = await response.json();

      const token = data.jwtToken;
      if (token) {
        const decodedToken = jwtDecode(token);
        localStorage.setItem('token', token);
        localStorage.setItem('username', decodedToken.name);
        localStorage.setItem('role', decodedToken.role);

        const role = decodedToken.role;
        if (role === 'RMS_Customer') navigate('/customer/dashboard');
        else if (role === 'RMS_Admin') navigate('/admin/dashboard');
        else if (role === 'RMS_Business') navigate('/business/dashboard');
      } else {
        throw new Error('Token not found in response');
      }
    } catch (err) {
      console.error('Error during login:', err.message);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Sign in to Restaurant Finder</h2>
        <p className="login-subtext">Connect with great local restaurants</p>
        {error && <p className="error-message">{error}</p>}

        {/* Login form */}
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="login-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            className="login-input"
          />
          <button type="submit" className="login-button">
            Log in
          </button>
        </form>

        {/* Footer */}
        <p className="login-footer">
          New to Restaurant Finder?{' '}
          <a href="/register" className="sign-up-link">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
