// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to Restaurant Finder</h1>
      <p>Discover the best restaurants around you!</p>
      <nav>
        <ul>
          <li><Link to="/search">Search Restaurants</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
