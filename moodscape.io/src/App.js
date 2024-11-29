// src/App.js
import React, { useState } from 'react';
import TabBar from './components/TabBar/TabBar';
import FAQ from './components/FAQ/FAQ';
import Modal from './components/Modal/Modal';
import './App.css';

function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownloadClick = (event) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div id="home" className="App">
      {/* TabBar Component */}
      <TabBar />
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
        <h1>MoodScape</h1>
        <p>Let your emotions set the playlist.</p>
        <a href="#app-description" onClick={(e) => {
          e.preventDefault();
          scrollToSection('app-description');
        }} className="cta-button">Explore Now</a>
        </div>
        
        <img src={require('./images/app_views.png')} alt="App View" className="app-views-image" />
      </header>

       {/* App Description Section */}
      <section id="app-description" className="app-description-section">
        <div className="app-description-box">
        <h2>What is <span className="highlight">MoodScape</span>?</h2>
        <p>
          <strong>MoodScape</strong> is a music discovery app designed to create playlists based on your current mood. 
          Whether you're feeling happy, sad, or anything in between, MoodScape helps you connect with the 
          right music to enhance your emotions. With our easy-to-use interface, simply select your mood 
          and let MoodScape generate a personalized playlist that resonates with you. 
          Experience music like never before!
        </p>
        </div>
      </section>

      {/* Download Now Button Section */}
      <section id="download" className="download-section">
        <div className="download-container">
          <a href="#" onClick={handleDownloadClick} className="download-button">Download Now</a>
          <p className="download-description">Get the MoodScape app and start creating playlists based on your mood!</p>
        </div>
      </section>


      {/* How it works */}
      <section className="how-it-works">
        <h2>How does it work?</h2>
        <div className="video-container">
          <video controls>
            <source src={require('../public/demo.mov')} type="video/mov" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={closeModal} />

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
        <h2>Want to be the first to try MoodScape?</h2>
        <p>Sign up now to get notified when MoodScape is released and create your personalized playlists based on your mood.</p>

        {/* Email Sign Up Form */}
        <form id="contact" className="cta-form">
          <input
            type="email"
            className="email-input"
            placeholder="Enter your email address"
            required
          />
          <button type="submit" className="cta-button">Notify Me</button>
        </form>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2024 MoodScape. All rights reserved.</p>
        <p>For any questions or information, feel free to send us an email at <a href="mailto:contact@moodscape.io">contact@moodscape.io</a>.</p>
      </footer>
    </div>
  );
}

const scrollToSection = (id) => {
  const section = document.getElementById(id);
  const offset = 100; // Adjust this value as needed

  if (section) {
    const elementPosition = section.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
};

export default App;