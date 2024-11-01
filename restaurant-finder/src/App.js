// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import pages
import Home from './pages/Home';
import Search from './pages/User/Search';
import RestaurantDetails from './pages/User/RestaurantDetails';
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
        <Route path="/business/dashboard" element={<BusinessOwnerDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/register" element={<Register />} />  {/* Add Register Route */}
        <Route path="/login" element={<Login />} />        {/* Add Login Route */}
      </Routes>
    </Router>
  );
}

export default App;
