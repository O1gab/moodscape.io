// src/App.js
import React from 'react';
import TabBar from './components/TabBar/TabBar';
import './App.css';
import PlaylistGenerator from './components/PlaylistGenerator/PlaylistGenerator';
function App() {
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
          {/* TODO: IMPLEMENT HERE THE PLAYLIST GENERATION FUNCTIONALITY */}
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
            <h3>Mood Analysis</h3>
            <p>Advanced algorithm to analyze and match your current emotional state with music</p>
          </div>
          <div className="feature-item">
            <h3>Spotify Integration</h3>
            <p>Seamlessly connect with your Spotify account to save and share your mood-based playlists</p>
          </div>
          <div className="feature-item">
            <h3>Customization</h3>
            <p>Fine-tune your playlists by adjusting genres, energy levels, and other musical preferences</p>
          </div>
          <div className="feature-item">
            <h3>Mood Tracking</h3>
            <p>Keep track of your emotional journey through music over time</p>
          </div>
        </div>
      </div>

      {/* DOWNLOAD SECTION */}
      <div className="download-section">
        <h2>Download MoodScape</h2>
        <div className="description">
          <p>MoodScape is currently available on TestFlight. Soon we are going to launch on AppStore, so stay tuned to us!</p>
          <button className="download-button">Download Now</button>
          <div className="instructions">
            <h3> How to download?</h3>
            <p> ◯ You must have the latest version of iOS installed.<br />
                ◯ Install TestFlight from the App Store.<br />
                ◯ Search for MoodScape in the TestFlight app or click on the button below.<br />
                ◯ Install the app and start using MoodScape!</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;