import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config/config';
import './Register.css';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    role: 'customer', // default role
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${config.services.userService}/api/user`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.username,
            email: formData.email,
            password: formData.password,
            userTypeId:
              formData.role === 'admin'
                ? 2
                : formData.role === 'business-owner'
                ? 3
                : 1,
          }),
        }
      );

      if (!response.ok) throw new Error('Registration failed');
      const data = await response.json();
      console.log('Registered:', data);

      localStorage.setItem('username', formData.username);

      setSuccess(true);

      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <button className="close-modal" onClick={() => navigate('/')}>×</button>
        <h2 className="register-title">
          Sign up for <br /> Restaurant Finder
        </h2>
        <p className="register-subtext">Connect with great local restaurants</p>
        {error && <p className="error-message">{error}</p>}
        {success && (
          <p className="success-message">
            Registration successful! Redirecting to login...
          </p>
        )}
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="register-input"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="register-input"
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
            <option value="business-owner">Business Owner</option>
          </select>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="register-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="register-input"
          />
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
        <p className="register-footer">
          Already a member?{' '}
          <a href="/login" className="login-link">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
