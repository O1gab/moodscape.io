// src/App.js
import React from 'react';
import TabBar from './components/TabBar/TabBar';
import './App.css';

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
          <div className="test-container"></div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="features">
        <h2>There’s more than just a playlist generation.</h2>
        <div className="description">
          <p>MoodScape has many other features!</p>
        </div>
        <div className="features-container">
          <div className="feature-item-1"></div>
          <div className="feature-item-2"></div>
          <div className="feature-item-3"></div>
          <div className="feature-item-4"></div>
        </div>
      </div>


    </div>
  );
}

export default App;