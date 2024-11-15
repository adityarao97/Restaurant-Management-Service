// src/components/Auth/Register.js
import React, { useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    role: 'user',  // default role
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8081/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.username,
          email: formData.email,
          password: formData.password,
          userTypeId: formData.role === 'admin' ? 1 : formData.role === 'business-owner' ? 3 : 2,  // Adjust IDs as needed
        }),
      });
      
      if (!response.ok) throw new Error('Registration failed');
      const data = await response.json();
      console.log('Registered:', data);
      // Redirect to login or show success message
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="business-owner">Business Owner</option>
        </select>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
