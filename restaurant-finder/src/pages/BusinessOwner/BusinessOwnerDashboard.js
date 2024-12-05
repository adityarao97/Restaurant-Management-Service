import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config/config";
import "./businessOwner.css";

function BusinessOwnerDashboard() {
  const [username, setUsername] = useState(null);
  const [listings, setListings] = useState([]);
  const [editingListingId, setEditingListingId] = useState(null);
  const [newListing, setNewListing] = useState({
    name: "",
    address: "",
    contactInfo: "",
    description: "",
    categories: "",
    zipCode: "",
    averageRating: "",
    priceRange: "",
    photos: "",
    businessOwnerId: "",
    hours: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
    const fetchAllListings = async () => {
      try {
        const response = await fetch(
          `${config.services.restaurantService}/restaurants/byBusinessOwner?businessOwnerId=${localStorage.getItem(
            "username"
          )}`
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
    if (!response.ok) throw new Error("Error in logout API");
    navigate("/");
  };

  return (
    <div className="common-container">
      {username && <h2 className="welcome-message">Welcome, {username}!</h2>}
      <h2>Your Listings</h2>

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
        padding: "10px 20px",
        margin: "10px",
        backgroundColor: "#1e90ff",
        color: "white",
        border: "none",
        fontSize: "1rem",
        cursor: "pointer",
        borderRadius: "5px",
        transition: "background-color 0.3s ease",
        position: "absolute",
        top: "10px", // Adjust as needed
        right: "130px", // Aligns the button to the extreme right
    }}
>
    All Restaurants and Search
</button>


      <ul className="ul-custom">
        {listings.map((listing) => (
          <li className="li-custom" key={listing.id}>
            <span>{listing.name}</span> - <span>{listing.address}</span> -{" "}
            <span>{listing.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BusinessOwnerDashboard;
