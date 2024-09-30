import React, { useState } from 'react';

const CTASection = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email) {
      const response = await fetch('http://localhost:3001/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitted(true);
        setEmail('');
      }
    }
  };

  return (
    <section className="cta-section">
      <h2>Want to be the first to try MoodScape?</h2>
      <p>Sign up now to get notified when MoodScape is released and create your personalized playlists based on your mood.</p>

      {!submitted ? (
        <form className="cta-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="email-input"
            placeholder="Enter your email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="cta-button">Notify Me</button>
        </form>
      ) : (
        <p>Thanks for signing up!</p>
      )}
    </section>
  );
};

export default CTASection;
