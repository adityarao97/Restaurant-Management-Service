// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import pages
import Home from './pages/Home';
import Search from './pages/User/Search';
import RestaurantDetails from './pages/User/RestaurantDetails';
import CustomerDashboard from './pages/User/CustomerDashboard';
import BusinessOwnerDashboard from './pages/BusinessOwner/BusinessOwnerDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/restaurant/:id" element={<RestaurantDetails />} />
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/business/dashboard" element={<BusinessOwnerDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
