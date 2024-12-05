import React, { useState, useEffect } from 'react';
import './AllRestaurants.css'; // Ensure this CSS file aligns with your app's theme
import config from '../../config/config'; // Adjust the path as needed

function AllRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(`${config.services.restaurantService}/restaurants/getRestaurants`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setRestaurants(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="all-restaurants">
      <h2>All Restaurants</h2>
      <div className="restaurant-list">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="restaurant-card">
            <h3>{restaurant.name}</h3>
            <p><strong>Address:</strong> {restaurant.address || 'N/A'}</p>
            <p><strong>Contact:</strong> {restaurant.contactInfo || 'N/A'}</p>
            <p><strong>Description:</strong> {restaurant.description || 'No description available.'}</p>
            <p><strong>Categories:</strong> {restaurant.categories ? restaurant.categories.join(', ') : 'N/A'}</p>
            <p><strong>Zip Code:</strong> {restaurant.zipCode || 'N/A'}</p>
            <p><strong>Average Rating:</strong> {restaurant.averageRating || 'N/A'}</p>
            <p><strong>Price Range:</strong> {restaurant.priceRange ? `$${restaurant.priceRange}` : 'N/A'}</p>
            <p><strong>Hours:</strong> {restaurant.hours || 'N/A'}</p>
            {restaurant.photos && restaurant.photos.length > 0 && (
              <div className="photos">
                <strong>Photos:</strong>
                <div className="photo-gallery">
                  {restaurant.photos.map((photo, index) => (
                    <img key={index} src={photo} alt={`${restaurant.name} ${index + 1}`} />
                  ))}
                </div>
              </div>
            )}
            {restaurant.reviews && restaurant.reviews.length > 0 && (
              <div className="reviews">
                <strong>Reviews:</strong>
                <ul>
                  {restaurant.reviews.map((review, index) => (
                    <li key={index}>
                      <p><strong>{review.userName}:</strong> {review.comment}</p>
                      <p>Rating: {review.rating} / 5</p>
                      <p>Date: {new Date(review.timestamp).toLocaleDateString()}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllRestaurants;
