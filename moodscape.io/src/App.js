// src/App.js
import React, { useState } from 'react';
import TabBar from './components/TabBar/TabBar';
import './App.css';
import PlaylistGenerator from './components/PlaylistGenerator/PlaylistGenerator';

function App() {
  const [openAnswer, setOpenAnswer] = useState(null);

  const toggleAnswer = (id) => {
    setOpenAnswer(openAnswer === id ? null : id);
  };

  return (
    <div className="App">
      <TabBar />

      {/* HOME PAGE */}
      <div className="home-page">
        <div className="homepage-content">
          <h1>Let your emotions<br />set the playlist.
            <div className="description">
              <p>Create playlists on Spotify that reflect<br />your current mood.</p>
              <button className="generate-button">Generate a playlist</button>
            </div>
          </h1>
        </div>

        <div className="content-right">
          <video 
            className="playlist_generation_view"
            autoPlay
            muted 
            playsInline
          >
            <source src={process.env.PUBLIC_URL + '/videos/playlist_generation_view.mp4'} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>"

      {/* INFO SECTION */}
      <div className="info">
        <h2>What is MoodScape?</h2>
        <div className="blur-circle"></div>
        <div className="description">
          <p>MoodScape is a music discovery app designed to create playlists based on your current mood. Whether you're feeling happy, sad, or anything in between, MoodScape helps you connect with the right music to enhance your emotions. With our easy-to-use interface, simply select your mood and let MoodScape generate a personalized playlist that resonates with you. Experience music like never before!</p>
        </div>
      </div>

      {/* TEST SECTION */}
      <div className="test-section">
        <h2>Express your emotions through music.</h2>
        <div className="description">
            <p>Try it out now!</p>
            <div className="test"></div>
          <div className="test-container">
            <PlaylistGenerator />
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="features">
        <h2>There’s more than just a playlist generation.</h2>
        <div className="description">
          <p>MoodScape has many other features!</p>
        </div>
        <div className="features-container">
          <div className="feature-item">
            <h3>Connect with Friends</h3>
            <p>Add your friends on MoodScape to see what they’re listening to, recommend songs, and share your mood. Discover new music through the people you care about.</p>
          </div>
          <div className="feature-item">
            <h3>Mood Tracking</h3>
            <p>Track your emotional journey over time by connecting your mood with music. Reflect on how your playlists evolve as your emotions do.</p>
          </div>
          <div className="feature-item">
            <h3>Discover New Artists and Music</h3>
            <p>MoodScape helps you step out of your music bubble by introducing you to fresh artists and tracks based on your unique mood and recommendations.</p>
          </div>
          <div className="feature-item">
            <h3>Personalized Playlists</h3>
            <p>Get curated music recommendations tailored to your current mood. Whether you're feeling happy, calm, or nostalgic, we’ve got the perfect playlist for you.</p>
          </div>
        </div>
      </div>

      {/* DOWNLOAD SECTION */}
      <div className="download-section">
        <h2>Download MoodScape</h2>
        <div className="description">
          <p>MoodScape is currently available on TestFlight. Soon we are going to launch on AppStore, so stay tuned to us!</p>
          <button className="download-button">Download Now</button>
          <div className="blur-circle"></div>
        </div>
      </div>

      {/* FAQ SECTION */}
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-container">

          <div className="faq-item">
            <button 
              className="faq-question" 
              onClick={() => toggleAnswer(1)} 
              aria-expanded={openAnswer === 1}
            >
              When can I download MoodScape on AppStore?
            </button>
            {openAnswer === 1 && (
              <div className={`faq-answer ${openAnswer === 1 ? 'open' : ''}`}>
                <p>MoodScape is currently in the testing phase. Once we've perfected the app, you’ll be able to find it on the App Store. If you download the beta version, you’ll be notified by the App Store as soon as MoodScape is officially available.</p>
              </div>
            )}
          </div>
          
          <div className="faq-item">
            <button 
              className="faq-question" 
              onClick={() => toggleAnswer(2)} 
              aria-expanded={openAnswer === 2}
            >
              How to download the beta from TestFlight?
            </button>
            {openAnswer === 2 && (
              <div className={`faq-answer ${openAnswer === 2 ? 'open' : ''}`}>
                <p>1. Download the TestFlight app from the App Store, if you don’t already have it.
                <br /><br />2. Ensure you have the latest version of iOS installed on your iPhone.
                <br /><br />3. Tap on the Download button above.
                <br /><br />4. Open TestFlight and accept the invitation to join the MoodScape beta testing program.
                <br /><br />5. Once accepted, you’ll be able to install the beta version of MoodScape directly through TestFlight.</p>
              </div>
            )}
          </div>

          <div className="faq-item">
            <button 
              className="faq-question" 
              onClick={() => toggleAnswer(3)} 
              aria-expanded={openAnswer === 3}
            >
              How does MoodScape create playlists?
            </button>
            {openAnswer === 3 && (
              <div className="faq-answer">
                <p>MoodScape employs an AI-driven algorithm to create personalized playlists tailored to your selected emotions. Once your playlist is generated, it will be available for you to view and access it on Spotify.</p>
              </div>
            )}
          </div>

          <div className="faq-item">
            <button 
              className="faq-question" 
              onClick={() => toggleAnswer(4)} 
              aria-expanded={openAnswer === 4}
            >
              Is MoodScape free?
            </button>
            {openAnswer === 4 && (
              <div className="faq-answer">
                <p>Yes, you can use MoodScape and generate as many playlists as you want absolutely for free.</p>
              </div>
            )}
          </div>

          <div className="faq-item">
            <button 
              className="faq-question" 
              onClick={() => toggleAnswer(5)} 
              aria-expanded={openAnswer === 5}
            >
              Do I need a Spotify account to use the app?
            </button>
            {openAnswer === 5 && (
              <div className="faq-answer">
                <p>Yes.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CONTACT SECTION */}
      <div className="contact-section">
        <h2>Contact Us</h2>
        <div className="blur-circle"></div>
        <div className="description">
          <p>If you have any questions, offers, or feedback, please feel free to contact us at <a href="mailto:contact@moodscape.io">contact@moodscape.io</a>.</p>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 MoodScape. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default App;