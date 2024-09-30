import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
        <div className="modal-content">
            <button className="close-button" onClick={onClose}>
                &times;
            </button>
        <h2>Almost There!</h2>
        <p>MoodScape is currently under moderation and will be launched soon (mid-October). Sign up to get notified once MoodScape is available!</p>
        <form className="email-form">
          <input type="email" className="email-input" placeholder="Enter your email" required />
          <button type="submit" className="cta-button">Notify Me</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
