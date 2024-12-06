import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Search.css';
import config from '../../config/config';
import AddReview from './AddReview';

function Search() {
  const [username, setUsername] = useState(null); // Stores the logged-in username
  const [filters, setFilters] = useState({
    name: '',
    zipCode: '',
    categories: '',
    averageRating: '',
  }); // Stores search filters
  const [results, setResults] = useState([]); // Stores search results
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [activeReviewForm, setActiveReviewForm] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve username from localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }

    // Fetch all restaurants on initial load
    const fetchAllRestaurants = async () => {
      try {
        const response = await fetch(
          `${config.services.restaurantService}/restaurants/getRestaurants`
        );
        if (!response.ok) throw new Error('Failed to fetch restaurants');
        const data = await response.json();
        setResults(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllRestaurants();
  }, []);

  const handleReviewAdded = (updatedRestaurant) => {
    setResults((prevResults) =>
      prevResults.map((restaurant) =>
        restaurant.id === updatedRestaurant.id ? updatedRestaurant : restaurant
      )
    );
    setActiveReviewForm(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      let response;
      if (filters.zipCode && !filters.name && !filters.categories && !filters.averageRating) {
        // Call external API when only zipCode is provided
        response = await fetch(
          `${config.services.restaurantService}/restaurants/searchByZipCode?zipCode=${filters.zipCode}&provider=fourSquareSearchStrategy`
        );
      } else {
        // Existing search logic
        const queryParams = new URLSearchParams();
        if (filters.name) queryParams.append('name', filters.name);
        if (filters.zipCode) queryParams.append('zipCode', filters.zipCode);
        if (filters.categories) queryParams.append('categories', filters.categories);
        if (filters.averageRating) queryParams.append('averageRating', filters.averageRating);
  
        response = await fetch(
          `${config.services.restaurantService}/restaurants/search?${queryParams.toString()}`
        );
      }
  
      if (!response.ok) throw new Error('Failed to fetch search results');
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("token")
    const response = await fetch(
      `${config.services.userService}/api/user/logout?token=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if(!response.ok) throw new Error('error in logout api');
    navigate('/');
  }
  

  return (
    <div className="search-container">
      {username && <h2 className="welcome-message">Welcome, {username}!</h2>}
      <h1 className="search-title">Search Restaurants</h1>
      <button
    onClick={handleLogout} // Function to handle logout
    style={{
      position: "absolute",
      top: "8px",
      right: "20px",
      padding: "10px 20px",
      backgroundColor: "#f12711",
      color: "white",
      border: "none",
      fontSize: "1rem",
      cursor: "pointer",
      borderRadius: "5px",
      transition: "background-color 0.3s ease",
    }}
  >
    Logout
  </button>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          name="name"
          placeholder="Restaurant Name"
          value={filters.name}
          onChange={handleInputChange}
          className="search-input"
        />
        <input
          type="text"
          name="zipCode"
          placeholder="Zip Code"
          value={filters.zipCode}
          onChange={handleInputChange}
          className="search-input"
        />
        <input
          type="text"
          name="categories"
          placeholder="Categories (comma-separated)"
          value={filters.categories}
          onChange={handleInputChange}
          className="search-input"
        />
        <input
          type="number"
          name="averageRating"
          placeholder="Minimum Rating (1-5)"
          value={filters.averageRating}
          onChange={handleInputChange}
          min="1"
          max="5"
          step="0.1"
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      <div className="results-container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : results.length > 0 ? (
          <ul>
            {results.map((restaurant) => (
              <li key={restaurant.id} className="result-item">
                <h3>{restaurant.name}</h3>
                <p>Address: {restaurant.address}</p>
                <p>Categories: {(restaurant.categories ?? []).join(', ')}</p>
                <p>Average Rating: {restaurant.averageRating}</p>
                <p>Price Range: {restaurant.priceRange}</p>
                <p>Hours: {restaurant.hours}</p>

                <div className="reviews-section">
                  <h4>Reviews:</h4>
                  {restaurant.reviews && restaurant.reviews.length > 0 ? (
                    <ul>
                      {restaurant.reviews.map((review, index) => (
                        <li key={index}>
                          <p>
                            <strong>{review.userName}</strong> ({new Date(review.timestamp).toLocaleString()}):
                          </p>
                          <p>Rating: {review.rating}</p>
                          <p>{review.comment}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No reviews yet.</p>
                  )}
                </div>

                {activeReviewForm === restaurant.id ? (
                  <AddReview
                    restaurantId={restaurant.id}
                    onReviewAdded={handleReviewAdded}
                  />
                ) : (
                  <button
                    className="add-review-button"
                    onClick={() => setActiveReviewForm(restaurant.id)}
                  >
                    Add Review
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No restaurants found with the given criteria.</p>
        )}
      </div>
    </div>
  );
}

export default Search;
