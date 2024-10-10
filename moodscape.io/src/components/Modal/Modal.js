import React, { useState } from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://moodscape.io/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitted(true);
        setEmail("");
      } else {
        const errorData = await response.text();
        setErrorMessage(`Error: ${errorData}`);
      }
    } catch (error) {
      setErrorMessage("Error subscribing. Please try again later.");
      console.error("Error during subscription: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} role="dialog" aria-modal="true">
      <div className="modal-content">
        <button className="close-button" onClick={onClose} aria-label="Close modal">
          &times;
        </button>
        <h2>Almost There!</h2>
        <p>MoodScape is currently under moderation and will be launched soon (mid-October). Sign up to get notified once MoodScape is available!</p>
        {!submitted ? (
          <>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            
            <form className="email-form" onSubmit={handleSubmit}>
              <input
                type="email"
                className="email-input"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email input"
              />
              <button type="submit" className="cta-button" disabled={loading}>
                {loading ? 'Submitting...' : 'Notify Me'}
              </button>
            </form>
          </>
        ) : (
          <div>
            <p className="success-message">Thanks for signing up!</p>
            <p className="success-message">A confirmation email has been sent to {email}.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
