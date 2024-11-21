import React, { useState, useEffect } from 'react';
import './Search.css';

function Search() {
  const [username, setUsername] = useState(null); // Stores the logged-in username
  const [filters, setFilters] = useState({
    name: '',
    cuisine: '',
    type: '',
    priceRange: '',
    rating: '',
  }); // Stores search filters

  const [results, setResults] = useState([]); // Stores search results

  useEffect(() => {
    // Retrieve username from localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = async () => {
    try {
      // Fetch restaurants from the API
      const response = await fetch('http://3.101.125.192:8080/restaurants/getRestaurants');
      if (!response.ok) throw new Error('Failed to fetch restaurants');
      const data = await response.json();

      // Filter the results locally based on the user's search filters
      const filteredResults = data.filter((restaurant) => {
        return (
          (filters.name === '' || restaurant.name.toLowerCase().includes(filters.name.toLowerCase())) &&
          (filters.cuisine === '' || restaurant.cuisine.toLowerCase().includes(filters.cuisine.toLowerCase())) &&
          (filters.type === '' || restaurant.type.toLowerCase().includes(filters.type.toLowerCase())) &&
          (filters.priceRange === '' || restaurant.priceRange.toLowerCase() === filters.priceRange.toLowerCase()) &&
          (filters.rating === '' || restaurant.rating >= parseFloat(filters.rating))
        );
      });

      setResults(filteredResults);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  return (
    <div className="search-container">
      {/* Display the username in the welcome message */}
      {username && <h2 className="welcome-message">Welcome, {username}!</h2>}
      <h1 className="search-title">Search Restaurants</h1>

      {/* Search Filters */}
      <form className="search-form">
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
          name="cuisine"
          placeholder="Cuisine (e.g., Italian, Japanese)"
          value={filters.cuisine}
          onChange={handleInputChange}
          className="search-input"
        />
        <input
          type="text"
          name="type"
          placeholder="Food Type (e.g., Vegan, Vegetarian)"
          value={filters.type}
          onChange={handleInputChange}
          className="search-input"
        />
        <select
          name="priceRange"
          value={filters.priceRange}
          onChange={handleInputChange}
          className="search-input"
        >
          <option value="">Select Price Range</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input
          type="number"
          name="rating"
          placeholder="Minimum Rating (1-5)"
          value={filters.rating}
          onChange={handleInputChange}
          min="1"
          max="5"
          step="0.1"
          className="search-input"
        />
        <button type="button" onClick={handleSearch} className="search-button">
          Search
        </button>
      </form>

      {/* Search Results */}
      <div className="results-container">
        <h2>Results:</h2>
        {results.length > 0 ? (
          <ul>
            {results.map((restaurant) => (
              <li key={restaurant.id}>
                <h3>{restaurant.name}</h3>
                <p>Cuisine: {restaurant.cuisine}</p>
                <p>Type: {restaurant.type}</p>
                <p>Price Range: {restaurant.priceRange}</p>
                <p>Rating: {restaurant.rating}</p>
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
