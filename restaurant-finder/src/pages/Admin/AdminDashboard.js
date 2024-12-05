import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config/config";
import "./admin.css";

function AdminDashboard() {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
    const fetchAllListings = async () => {
      try {
        const response = await fetch(
          `${config.services.restaurantService}/restaurants/getRestaurants`
        );
        if (!response.ok) throw new Error("Failed to fetch restaurants");
        const data = await response.json();
        setListings(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchAllListings();
  }, []);

  const handleDeleteListing = async (id) => {
    setListings(listings.filter((listing) => listing.id !== id));
    const response = await fetch(
      `${config.services.restaurantService}/restaurants/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${config.services.userService}/api/user/logout?token=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) throw new Error("error in logout api");
    navigate("/");
  };

  const duplicateListings = checkDuplicates();

  return (
    <div className="common-container">
      {username && <h2 className="welcome-message">Welcome, {username}!</h2>}
      <h2>All Listings</h2>

      <button
        onClick={handleLogout}
        style={{
          position: "absolute",
          top: "20px",
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

      <button
        onClick={() => navigate("/search")}
        style={{
          position: "absolute",
          top: "20px",
          right: "150px", // Adjust spacing from the Logout button
          padding: "10px 20px",
          backgroundColor: "#1e90ff",
          color: "white",
          border: "none",
          fontSize: "1rem",
          cursor: "pointer",
          borderRadius: "5px",
          transition: "background-color 0.3s ease",
        }}
      >
        All Restaurants and Search
      </button>

      <ul className="ul-custom">
        {listings.map((listing) => (
          <li className="li-custom" key={listing.id}>
            {listing.name} - {listing.address} - {listing.description} - {listing.contactInfo}
            <button onClick={() => handleDeleteListing(listing.id)}>
              Delete
            </button>
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
                <li className="li-custom" key={listing.id}>
                  {listing.name} - {listing.address}
                </li>
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
