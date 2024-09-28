// src/App.js
import React from 'react';
import TabBar from './TabBar';
import FAQ from './FAQ';
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

        <img src={require('./images/app_views.png')} alt="App View" className="app-views-image" />
      </header>

       {/* App Description Section */}
      <section className="app-description-section">
        <div className="app-description-box">
        <h2>What is <span className="highlight">MoodScape</span>?</h2>
        <p>
          MoodScape is a music discovery app designed to create playlists based on your current mood. 
          Whether you're feeling happy, sad, or anything in between, MoodScape helps you connect with the 
          right music to enhance your emotions. With our easy-to-use interface, simply select your mood 
          and let MoodScape generate a personalized playlist that resonates with you. 
          Experience music like never before!
        </p>
        </div>
      </section>

       {/* Download Now Button Section */}
      <section className="download-section">
        <div className="download-container">
          <a href="#download" className="download-button">Download Now</a>
          <p className="download-description">Get the MoodScape app and start creating playlists based on your mood!</p>
        </div>
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
            <h3>Discrover new music & recommendations</h3>
            <p>Be in touch with new music releases and get music recommendations based on your music taste.</p>
          </div>
          <div className="feature">
            <h3>Spotify Integration</h3>
            <p>Connect your Spotify account and start listening instantly.</p>
          </div>
          <div className="feature">
            <h3>Unlock new experience for free</h3>
            <p>MoodScape is completely free to use! Dive into a world of music and mood exploration without spending any cent.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      
            <FAQ />
           


      {/* Call to Action */}
      <section className="cta-section">
        <h2>Ready to Discover New Moods?</h2>
        <p>Sign up now and start creating your own personalized playlists</p>
        <a href="#signup" className="cta-button">Get Started for Free</a>
      </section>

      {/* Signup Section */}
      <section className="signup-section" id="contact">
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