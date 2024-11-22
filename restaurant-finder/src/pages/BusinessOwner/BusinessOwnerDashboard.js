// src/pages/BusinessOwner/BusinessOwnerDashboard.js
import React, { useState } from 'react';
import Search from '../User/Search';

// Mock data for listings
const mockListings = [
  { id: 1, name: "Sushi Place", location: "123 Sushi St", status: "Active" },
  { id: 2, name: "Pasta House", location: "456 Pasta Rd", status: "Active" },
];

function BusinessOwnerDashboard() {
  const [listings, setListings] = useState(mockListings);
  const [newListing, setNewListing] = useState({ name: "", location: "", status: "Active" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewListing({ ...newListing, [name]: value });
  };

  const handleAddListing = (e) => {
    e.preventDefault();
    const newEntry = { id: listings.length + 1, ...newListing };
    setListings([...listings, newEntry]);
    setNewListing({ name: "", location: "", status: "Active" });
  };

  const handleDeleteListing = (id) => {
    setListings(listings.filter((listing) => listing.id !== id));
  };

  return (
    <div>
      <h1>Business Owner Dashboard</h1>
      <Search/>
      <h2>Your Listings</h2>
      <ul>
        {listings.map((listing) => (
          <li key={listing.id}>
            {listing.name} - {listing.location} ({listing.status})
            <button onClick={() => handleDeleteListing(listing.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Add New Listing</h2>
      <form onSubmit={handleAddListing}>
        <input
          type="text"
          name="name"
          placeholder="Restaurant Name"
          value={newListing.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newListing.location}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Listing</button>
      </form>
    </div>
  );
}

export default BusinessOwnerDashboard;
