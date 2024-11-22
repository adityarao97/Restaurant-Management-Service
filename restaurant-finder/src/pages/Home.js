import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      {/* Header */}
      <header className="home-header">
        <div className="header-left">
          <h1 className="logo">Restaurant Finder</h1>
        </div>

        {/* Navigation */}
        <nav className="header-nav">
          <ul>
            <li><Link to="/search">Restaurants Search</Link></li>
            <li><Link to="/login">Log In</Link></li>
            <li><Link to="/register" className="sign-up-button">Sign Up</Link></li>
          </ul>
        </nav>
      </header>

      {/* Main content */}
      <main className="home-content">
        <h2>Discover the best restaurants around you!</h2>
      </main>

      {/* Footer */}
      <footer className="home-footer">
        <p>&copy; 2024 Restaurant Finder. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;

