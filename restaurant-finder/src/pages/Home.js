import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Restaurant Finder</h1>
        <p>Discover the best restaurants around you!</p>
      </header>
      <nav className="home-nav">
        <ul>
          <li><Link to="/search">Search Restaurants</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </nav>
      <footer className="home-footer">
        <p>&copy; 2024 Restaurant Finder. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
