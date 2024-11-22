// AddReview.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './AddReview.css';
import config from '../../config/config';

function AddReview({ restaurantId, onReviewAdded }) {
  const [review, setReview] = useState({
    userName: '',
    rating: 1,
    comment: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`${config.services.restaurantService}/restaurants/${restaurantId}/addReview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      const updatedRestaurant = await response.json();
      onReviewAdded(updatedRestaurant);
      setReview({
        userName: '',
        rating: 1,
        comment: '',
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="add-review-container">
      <h3>Add a Review</h3>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="add-review-form">
        <input
          type="text"
          name="userName"
          placeholder="Your Name"
          value={review.userName}
          onChange={handleChange}
          required
          className="review-input"
        />
        <select
          name="rating"
          value={review.rating}
          onChange={handleChange}
          required
          className="review-input"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} Star{num > 1 && 's'}
            </option>
          ))}
        </select>
        <textarea
          name="comment"
          placeholder="Your Review"
          value={review.comment}
          onChange={handleChange}
          required
          className="review-input"
        />
        <button type="submit" className="submit-button">
          Submit Review
        </button>
      </form>
    </div>
  );
}

AddReview.propTypes = {
  restaurantId: PropTypes.string.isRequired,
  onReviewAdded: PropTypes.func.isRequired,
};

export default AddReview;
