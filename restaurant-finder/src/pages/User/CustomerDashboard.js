import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Search from './Search';
import './CustomerDashboard.css';

function CustomerDashboard() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleBusinessAccountClick = () => {
    navigate('/business/dashboard'); // Navigate to Business Owner Dashboard
  };

  return (
    <div className="dashboard-container">
      {/* Top Navigation */}
      <header className="dashboard-header">
        <div className="logo-container">
          <h1 className="logo">Restaurant Finder</h1>
        </div>

        <div className="search-restaurants-container">
          <h2 className="search-restaurants">Search Restaurants</h2>
        </div>

        <div className="dropdown-container">
          <button
            className="dropdown-button"
            onClick={toggleDropdown}
          >
            Customer Dashboard
          </button>
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              <li onClick={handleBusinessAccountClick}>Log in to Business Account</li>
            </ul>
          )}
        </div>
      </header>

      {/* Main Search Section */}
      <div className="main-content">
        <Search />
      </div>
    </div>
  );
}

export default CustomerDashboard;
