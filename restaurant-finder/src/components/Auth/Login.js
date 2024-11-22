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

      // Assuming the response contains a JWT token
      const token = data.jwtToken;
      if (token) {
        // Decode the JWT token
        const decodedToken = jwtDecode(token);
        console.log('Decoded JWT:', decodedToken);

        // Store the token and user information in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('username', decodedToken.name); // Assuming the token contains a 'name' claim
        // Redirect to the Search Restaurants page
        navigate('/search');
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
      <h2 className="login-title">Login</h2>
      {error && <p className="error-message">{error}</p>}
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
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
