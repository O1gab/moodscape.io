import React, { useState } from 'react';
import './PlaylistGenerator.css';

const PlaylistGenerator = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [artists, setArtists] = useState([
    // TEST DATA
    { id: 1, name: 'Artist 1', imageUrl: '' },
    { id: 2, name: 'Artist 2', imageUrl: '' },
  ]);

  return (
    <div className="playlist-generator">
      <h3>Select your favorite artists</h3>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for artists..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="artists-container">
        {artists.map((artist) => (
          <div key={artist.id} className="artist-circle">
            <img src={artist.imageUrl} alt={artist.name} />
            <p>{artist.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistGenerator;
