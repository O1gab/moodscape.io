import React, { useState } from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const emailToSubmit = email;

    try {
      const response = await fetch('https://moodscape-io.fly.dev/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailToSubmit }),
      });

      if (response.status === 409) {
      // If the response status is 409 (Conflict), the email already exists
        const data = await response.json();
        setErrorMessage(data.message);
        setSubmitted(false);
        return;
      }
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setSubmittedEmail(emailToSubmit)
      setEmail('');
      setErrorMessage('');
      setSubmitted(true); 
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Something went wrong. Please try again.');
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
          <>
            {/* Show error message if any */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            
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
          </>
        ) : (
          <div>
            <p className="success-message">Thanks for signing up!</p>
            <p className="success-message">A confirmation email has been sent to {submittedEmail}.</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Modal;
