import React, { useState } from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const emailToSubmit = email; // Get the email from state

    try {
      const response = await fetch('http://localhost:3001/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailToSubmit }), // Submit the email from state
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      
      setSubmitted(true); // Update the submitted state to true
      setEmail(''); // Clear the email input after submission
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Almost There!</h2>
        <p>MoodScape is currently under moderation and will be launched soon (mid-October). Sign up to get notified once MoodScape is available!</p>
        {!submitted ? (
          <form className="email-form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="email-input"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="cta-button">Notify Me</button>
          </form>
        ) : (
          <div>
            <p>Thanks for signing up!</p>
            <p>A confirmation email has been sent to {email}.</p> {/* Show the email */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
