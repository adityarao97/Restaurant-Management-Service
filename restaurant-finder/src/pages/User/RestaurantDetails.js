// src/pages/User/RestaurantDetails.js
import React, { useState } from 'react';

// Mock data for the restaurant and reviews
const mockRestaurant = {
  id: 1,
  name: "Sushi Place",
  cuisine: "Japanese",
  type: "Vegan",
  priceRange: "High",
  location: "123 Sushi St, Tokyo",
  rating: 4.5,
};

const mockReviews = [
  { id: 1, user: "John Doe", rating: 5, comment: "Amazing sushi!" },
  { id: 2, user: "Jane Smith", rating: 4, comment: "Great ambiance and food." },
];

function RestaurantDetails() {
  const [reviews, setReviews] = useState(mockReviews);
  const [newReview, setNewReview] = useState({ rating: "", comment: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const newReviewEntry = {
      id: reviews.length + 1,
      user: "Current User", // Replace with actual user info if available
      rating: parseFloat(newReview.rating),
      comment: newReview.comment,
    };
    setReviews([...reviews, newReviewEntry]);
    setNewReview({ rating: "", comment: "" }); // Reset form
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>{mockRestaurant.name}</h1>
      <p>Cuisine: {mockRestaurant.cuisine}</p>
      <p>Type: {mockRestaurant.type}</p>
      <p>Price Range: {mockRestaurant.priceRange}</p>
      <p>Location: {mockRestaurant.location}</p>
      <p>Rating: {mockRestaurant.rating}</p>

      <h2>Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <strong>{review.user}</strong>: {review.rating} stars
            <p>{review.comment}</p>
          </li>
        ))}
      </ul>

      <h2>Leave a Review</h2>
      <form onSubmit={handleSubmitReview}>
        <input
          type="number"
          name="rating"
          placeholder="Rating (1-5)"
          value={newReview.rating}
          onChange={handleInputChange}
          min="1"
          max="5"
          required
        />
        <textarea
          name="comment"
          placeholder="Write your review here"
          value={newReview.comment}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default RestaurantDetails;
