import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  // Array of slides
  const slides = [
    {
      image: '/images/slide1.png',
    },
    {
      image: '/images/slide2.png',
    },
    {
      image: '/images/slide3.png',
    },
  ];

  // State for current slide
  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatic slide change every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // 5 seconds
    return () => clearInterval(interval); // Cleanup interval
  }, [slides.length]);

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
            <li>
              <Link to="/login">Log In</Link>
            </li>
            <li>
              <Link to="/register" className="sign-up-button">
                Sign Up
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Photo Slider */}
      <div className="photo-slider">
        <img
          src={slides[currentSlide].image}
          alt="Restaurant slide"
          className="slider-image"
        />
      </div>

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
