// src/pages/User/Search.js
import React, { useState } from 'react';

// Mock data to simulate search results
const mockRestaurants = [
  {
    id: 1,
    name: "Sushi Place",
    cuisine: "Japanese",
    type: "Vegan",
    priceRange: "High",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Pasta House",
    cuisine: "Italian",
    type: "Vegetarian",
    priceRange: "Medium",
    rating: 4.0,
  },
  // Add more mock restaurants as needed
];

function Search() {
  // State for form inputs
  const [filters, setFilters] = useState({
    name: '',
    cuisine: '',
    type: '',
    priceRange: '',
    rating: '',
  });
  
  // State for filtered results
  const [results, setResults] = useState(mockRestaurants);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = () => {
    // Filter mockRestaurants based on filters
    const filteredResults = mockRestaurants.filter((restaurant) => {
      return (
        (filters.name === '' || restaurant.name.toLowerCase().includes(filters.name.toLowerCase())) &&
        (filters.cuisine === '' || restaurant.cuisine.toLowerCase().includes(filters.cuisine.toLowerCase())) &&
        (filters.type === '' || restaurant.type.toLowerCase().includes(filters.type.toLowerCase())) &&
        (filters.priceRange === '' || restaurant.priceRange.toLowerCase() === filters.priceRange.toLowerCase()) &&
        (filters.rating === '' || restaurant.rating >= parseFloat(filters.rating))
      );
    });
    setResults(filteredResults);
  };

  return (
    <div style={{ padding: '20px' }}>
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
