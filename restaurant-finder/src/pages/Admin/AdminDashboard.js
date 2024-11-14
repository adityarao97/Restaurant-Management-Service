// src/pages/Admin/AdminDashboard.js
import React, { useState } from 'react';

// Mock data for all listings
const mockListings = [
  { id: 1, name: "Sushi Place", location: "123 Sushi St" },
  { id: 2, name: "Pasta House", location: "456 Pasta Rd" },
  { id: 3, name: "Sushi Place", location: "123 Sushi St" }, // Duplicate example
];

function AdminDashboard() {
  const [listings, setListings] = useState(mockListings);

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
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>

      <h2>All Listings</h2>
      <ul>
        {listings.map((listing) => (
          <li key={listing.id}>
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
            <ul>
              {group.map((listing) => (
                <li key={listing.id}>{listing.name} - {listing.location}</li>
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
