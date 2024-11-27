// src/pages/Admin/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import config from "../../config/config";
import "./admin.css";


function AdminDashboard() {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null);

useEffect(() => {
  const storedUsername = localStorage.getItem('username');
  if (storedUsername) {
    setUsername(storedUsername);
  }
  const fetchAllListings = async () => {
    try {
      const response = await fetch(`${config.services.restaurantService}/restaurants/getRestaurants`);
      if (!response.ok) throw new Error("Failed to fetch restaurants");
      const data = await response.json();
      setListings(data);
    } catch (err) {
      setError(err.message);
    }
  };
  fetchAllListings();
}, []);

  
  const handleDeleteListing = (id) => {
    setListings(listings.filter((listing) => listing.id !== id));
  };

  const checkDuplicates = () => {
    const duplicates = listings.reduce((acc, listing) => {
      const key = listing.name + listing.location;
      if (acc[key]) acc[key].push(listing);
      else acc[key] = [listing];
      return acc;
    }, {});

    return Object.values(duplicates).filter((group) => group.length > 1);
  };

  const duplicateListings = checkDuplicates();

  return (
    <div className='common-container'>
      {username && <h2 className="welcome-message">Welcome, {username}!</h2>}
      <h2>All Listings</h2>
      <ul className="ul-custom">
        {listings.map((listing) => (
          <li className="li-custom" key={listing.id}>
            {listing.name} - {listing.location}
            <button onClick={() => handleDeleteListing(listing.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Duplicate Listings</h2>
      {duplicateListings.length > 0 ? (
        duplicateListings.map((group, index) => (
          <div key={index}>
            <p>Duplicate Group:</p>
            <ul className="ul-custom">
              {group.map((listing) => (
                <li  className="li-custom" key={listing.id}>{listing.name} - {listing.location}</li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No duplicates found.</p>
      )}
    </div>
  );
}

export default AdminDashboard;
