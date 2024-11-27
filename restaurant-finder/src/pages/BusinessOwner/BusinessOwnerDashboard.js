import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
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

  const handleEdit = (id) => {
    setEditingListingId(id);
  };

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setListings((prevListings) =>
      prevListings.map((listing) =>
        listing.id === id ? { ...listing, [name]: value } : listing
      )
    );
  };

  const handleUpdateListing = async (id) => {
    const updatedListing = listings.find((listing) => listing.id === id);

    try {
      const response = await fetch(
        `${config.services.restaurantService}/restaurants/saveRestaurant`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedListing),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update listing");
      }

      setEditingListingId(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteListing = async (id) => {
    try {
      const response = await fetch(
        `${config.services.restaurantService}/restaurants/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete listing");
      }

      setListings(listings.filter((listing) => listing.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddNewListing = async (e) => {
    e.preventDefault();

    const newListingData = {
      ...newListing,
      categories: newListing.categories.split(",").map((cat) => cat.trim()),
      photos: newListing.photos.split(",").map((url) => url.trim()),
    };

    try {
      const response = await fetch(
        `${config.services.restaurantService}/restaurants/saveRestaurant`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newListingData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add new listing");
      }

      const data = await response.json();
      setListings([...listings, data]);
      setNewListing({
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
    } catch (err) {
      setError(err.message);
    }
  };

  const handleNewListingChange = (e) => {
    const { name, value } = e.target;
    setNewListing((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="common-container">
        {username && <h2 className="welcome-message">Welcome, {username}!</h2>}
      <h2>Your Listings</h2>
      <ul className="ul-custom">
        {listings.map((listing) => (
          <li className="li-custom" key={listing.id}>
            {editingListingId === listing.id ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={listing.name}
                  onChange={(e) => handleChange(e, listing.id)}
                />
                <input
                  type="text"
                  name="address"
                  value={listing.address}
                  onChange={(e) => handleChange(e, listing.id)}
                />
                <textarea
                  name="description"
                  value={listing.description}
                  onChange={(e) => handleChange(e, listing.id)}
                />
                <button onClick={() => handleUpdateListing(listing.id)}>
                  Update
                </button>
              </>
            ) : (
              <>
                <span>{listing.name}</span> - <span>{listing.address}</span> -{" "}
                <span>{listing.description}</span>
                <button className="buttonEdit" onClick={() => handleEdit(listing.id)}>Edit</button>
                <button className="buttonDelete" onClick={() => handleDeleteListing(listing.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>

      <h2>Add New Listing</h2>
      <form onSubmit={handleAddNewListing}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={newListing.name}
            onChange={handleNewListingChange}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={newListing.address}
            onChange={handleNewListingChange}
          />
        </div>
        <div>
          <label>Contact Info:</label>
          <input
            type="text"
            name="contactInfo"
            value={newListing.contactInfo}
            onChange={handleNewListingChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={newListing.description}
            onChange={handleNewListingChange}
          />
        </div>
        <div>
          <label>Categories (comma separated):</label>
          <input
            type="text"
            name="categories"
            value={newListing.categories}
            onChange={handleNewListingChange}
          />
        </div>
        <div>
          <label>Zip Code:</label>
          <input
            type="text"
            name="zipCode"
            value={newListing.zipCode}
            onChange={handleNewListingChange}
          />
        </div>
        <div>
          <label>Average Rating:</label>
          <input
            type="number"
            name="averageRating"
            value={newListing.averageRating}
            onChange={handleNewListingChange}
            step="0.1"
            min="0"
            max="5"
          />
        </div>
        <div>
          <label>Price Range (1-4):</label>
          <input
            type="number"
            name="priceRange"
            value={newListing.priceRange}
            onChange={handleNewListingChange}
            min="1"
            max="4"
          />
        </div>
        <div>
          <label>Photos (comma separated URLs):</label>
          <input
            type="text"
            name="photos"
            value={newListing.photos}
            onChange={handleNewListingChange}
          />
        </div>
        <div>
          <label>Business Owner ID:</label>
          <input
            type="text"
            name="businessOwnerId"
            value={newListing.businessOwnerId}
            onChange={handleNewListingChange}
          />
        </div>
        <div>
          <label>Hours:</label>
          <input
            type="text"
            name="hours"
            value={newListing.hours}
            onChange={handleNewListingChange}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default BusinessOwnerDashboard;
