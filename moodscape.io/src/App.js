// src/App.js
import React from 'react';
import TabBar from './TabBar'; // Import the TabBar component
import './App.css';

function App() {
  return (
    <div className="App">
      {/* TabBar Component */}
      <TabBar />
      {/* Hero Section */}
      <header className="hero-section">
        <h1>MoodScape</h1>
        <p>Let your emotions set the playlist.</p>
        <a href="#features" className="cta-button">Explore Now</a>
      </header>

       {/* App Description Section */}
      <section className="app-description-section">
        <h2>What is MoodScape?</h2>
        <p>
          MoodScape is a music discovery app designed to curate playlists based on your current mood. 
          Whether you're feeling happy, sad, or anything in between, MoodScape helps you connect with the 
          right music to enhance your emotions. With our easy-to-use interface, simply select your mood 
          and let MoodScape generate a personalized playlist that resonates with you. 
          Experience music like never before!
        </p>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <h2>Why MoodScape?</h2>
        <div className="features">
          <div className="feature">
            <h3>Mood-Based Playlists</h3>
            <p>Generate playlists based on how you're feeling right now.</p>
          </div>
          <div className="feature">
            <h3>Trends</h3>
            <p>Be in touch with new music releases.</p>
          </div>
          <div className="feature">
            <h3>Spotify Integration</h3>
            <p>Connect your Spotify account and start listening instantly.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Ready to Discover New Moods?</h2>
        <p>Sign up now and start creating your own personalized playlists.</p>
        <a href="#signup" className="cta-button">Get Started for Free</a>
      </section>

      {/* Signup Section */}
      <section className="signup-section" id="signup">
        <h2>Sign Up for MoodScape</h2>
        <form>
          <input type="email" placeholder="Enter your email" required />
          <button type="submit">Sign Up</button>
        </form>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2024 MoodScape. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;