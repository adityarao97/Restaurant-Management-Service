// src/pages/User/Search.js
import React, { useState, useEffect } from 'react';

function Search() {
  const [username, setUsername] = useState(null);
  const [filters, setFilters] = useState({
    name: '',
    cuisine: '',
    type: '',
    priceRange: '',
    rating: '',
  });

  const [results, setResults] = useState([]);

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
    <div style={{ padding: '20px' }}>
      {/* Display the username in the welcome message */}
      {username && <h2>Welcome, {username}!</h2>}
      <h1>Search Restaurants</h1>
      <form style={{ marginBottom: '20px' }}>
        <input
          type="text"
          name="name"
          placeholder="Restaurant Name"
          value={filters.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="cuisine"
          placeholder="Cuisine (e.g., Italian, Japanese)"
          value={filters.cuisine}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="type"
          placeholder="Food Type (e.g., Vegan, Vegetarian)"
          value={filters.type}
          onChange={handleInputChange}
        />
        <select name="priceRange" value={filters.priceRange} onChange={handleInputChange}>
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
        />
        <button type="button" onClick={handleSearch}>Search</button>
      </form>

      <div>
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
