// src/App.js
import React from 'react';
import TabBar from './components/TabBar/TabBar';
import './App.css';

function App() {
  return (
    <div className="App">
      <TabBar />

      <div className="home-page">
        <h1>Let your emotions<br />set the playlist.
          <div className="description">
            <p>Create playlists on Spotify that reflect<br />your current mood.</p>
            <button className="generate-button">Generate a playlist</button>
          </div>
        </h1>

        <div className="content-right">
          <video 
            className="playlist_generation_view"
            autoPlay 
            loop
            muted 
            playsInline
          >
            <source src={process.env.PUBLIC_URL + '/videos/playlist_generation_view.mp4'} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>"

      {/* TODO: Add the features section */}

    </div>
  );
}

export default App;