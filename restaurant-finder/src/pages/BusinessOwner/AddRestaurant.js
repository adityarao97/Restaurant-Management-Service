import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config/config'; // Adjust the path as needed

function AddRestaurant() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contactInfo: '',
    description: '',
    categories: '',
    zipCode: '',
    averageRating: '',
    priceRange: '',
    hours: '',
    photos: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert categories and photos from comma-separated strings to arrays
    const categoriesArray = formData.categories.split(',').map((cat) => cat.trim());
    const photosArray = formData.photos.split(',').map((photo) => photo.trim());

    const restaurantData = {
      ...formData,
      categories: categoriesArray,
      photos: photosArray,
      averageRating: parseFloat(formData.averageRating),
      priceRange: parseFloat(formData.priceRange),
      businessOwnerId: localStorage.getItem('userId'), // Assuming userId is stored in localStorage
    };

    try {
      const response = await fetch(`${config.services.restaurantService}/restaurants/saveRestaurant`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(restaurantData),
      });

      if (!response.ok) throw new Error('Failed to save restaurant');

      // Redirect to the list of all restaurants after successful submission
      navigate('/all-restaurants');
    } catch (err) {
      setError('Error saving restaurant. Please try again.');
    }
  };

  return (
    <div className="add-restaurant-container">
      <h2>Add New Restaurant</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="add-restaurant-form">
        <input
          type="text"
          name="name"
          placeholder="Restaurant Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contactInfo"
          placeholder="Contact Information"
          value={formData.contactInfo}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="categories"
          placeholder="Categories (comma-separated)"
          value={formData.categories}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="zipCode"
          placeholder="Zip Code"
          value={formData.zipCode}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="averageRating"
          placeholder="Average Rating"
          value={formData.averageRating}
          onChange={handleChange}
          min="0"
          max="5"
          step="0.1"
          required
        />
        <input
          type="number"
          name="priceRange"
          placeholder="Price Range"
          value={formData.priceRange}
          onChange={handleChange}
          min="1"
          max="5"
          step="1"
          required
        />
        <input
          type="text"
          name="hours"
          placeholder="Operating Hours"
          value={formData.hours}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="photos"
          placeholder="Photo URLs (comma-separated)"
          value={formData.photos}
          onChange={handleChange}
        />
        <button type="submit">Save Restaurant</button>
      </form>
    </div>
  );
}

export default AddRestaurant;
