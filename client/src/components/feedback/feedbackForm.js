import React, { useState } from 'react';
import API from '../../services/api';

const FeedbackForm = ({ eventId }) => {
  const [formData, setFormData] = useState({
    message: '',
    rating: 1,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/feedback', { eventId, ...formData });
      alert('Feedback submitted successfully!');
    } catch (error) {
      console.error('Failed to submit feedback:', error.response?.data?.msg || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        name="message"
        placeholder="Your feedback"
        value={formData.message}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="rating"
        min="1"
        max="5"
        value={formData.rating}
        onChange={handleChange}
        required
      />
      <button type="submit">Submit Feedback</button>
    </form>
  );
};

export default FeedbackForm;