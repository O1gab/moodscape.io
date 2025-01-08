import React, { useState, useEffect } from 'react';
import './PlaylistGenerator.css';
import config from '../../config';

const PlaylistGenerator = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [artists, setArtists] = useState([]);
    const [selectedArtists, setSelectedArtists] = useState(new Set());
    const [accessToken, setAccessToken] = useState('');
    const [selectedArtistsData, setSelectedArtistsData] = useState(new Map());
    const [showMoodSelection, setShowMoodSelection] = useState(false);

    const SPOTIFY_CLIENT_ID = config.SPOTIFY_CLIENT_ID;
    const SPOTIFY_CLIENT_SECRET = config.SPOTIFY_CLIENT_SECRET;

    const fetchTopArtists = async (token) => {
        try {
            console.log('Fetching top artists with token:', token.substring(0, 5) + '...');
            
            const response = await fetch(
                'https://api.spotify.com/v1/browse/new-releases?limit=50', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Top tracks fetch failed:', {
                    status: response.status,
                    statusText: response.statusText,
                    error: errorText
                });
                throw new Error(`Top tracks fetch failed: ${errorText}`);
            }

            const data = await response.json();
            console.log('Received albums:', data.albums?.items?.length);

            if (!data.albums?.items || !Array.isArray(data.albums.items)) {
                throw new Error('Invalid response format');
            }

            // Extract unique artists from albums
            const uniqueArtists = [...new Map(
                data.albums.items
                .filter(album => album.artists && album.artists.length > 0)
                .map(album => ({
                    mainArtist: album.artists[0],
                    imageUrl: album.images[0]?.url
                }))
                .map(({ mainArtist, imageUrl }) => [
                    mainArtist.id,
                    {
                        id: mainArtist.id,
                        name: mainArtist.name,
                        imageUrl: imageUrl
                    }
                ])
            ).values()];

            console.log('Processed artists:', uniqueArtists.length);
            setArtists(uniqueArtists);
        } catch (error) {
            console.error('Error in fetchTopArtists:', error);
        }
    };

    useEffect(() => {
        const getAccessToken = async () => {
            try {
                const params = new URLSearchParams();
                params.append('grant_type', 'client_credentials');
                params.append('client_id', SPOTIFY_CLIENT_ID);
                params.append('client_secret', SPOTIFY_CLIENT_SECRET);

                const response = await fetch('https://accounts.spotify.com/api/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: params
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Token request failed: ${errorText}`);
                }

                const data = await response.json();
                console.log('Token received successfully');
                setAccessToken(data.access_token);
                await fetchTopArtists(data.access_token);
            } catch (error) {
                console.error('Error getting access token:', error);
            }
        };

        if (SPOTIFY_CLIENT_ID && SPOTIFY_CLIENT_SECRET) {
            getAccessToken();
        }
    }, [SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchQuery) {
                searchSpotifyArtists(searchQuery);
            } else {
                fetchTopArtists(accessToken);
            }
        }, 500); // Wait 500ms after user stops typing

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, accessToken]);

    const searchSpotifyArtists = async (query) => {
        try {
            const response = await fetch(
                `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist&limit=50`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (!response.ok) {
                throw new Error('Search failed');
            }

            const data = await response.json();
            
            const searchResults = data.artists.items.map(artist => ({
                id: artist.id,
                name: artist.name,
                imageUrl: artist.images && artist.images.length > 0 ? artist.images[0].url : null
            }));

            console.log('Search results with image info:', searchResults); // Debug log
            setArtists(searchResults);
        } catch (error) {
            console.error('Error searching artists:', error);
        }
    };

    const handleArtistClick = (artist) => {
        setSelectedArtists(prev => {
            const newSelection = new Set(prev);
            if (newSelection.has(artist.id)) {
                newSelection.delete(artist.id);
                const newData = new Map(selectedArtistsData);
                newData.delete(artist.id);
                setSelectedArtistsData(newData);
            } else {
                newSelection.add(artist.id);
                const newData = new Map(selectedArtistsData);
                newData.set(artist.id, artist);
                setSelectedArtistsData(newData);
            }
            return newSelection;
        });
    };

    const handleSubmit = () => {
        if (selectedArtists.size === 0) {
            alert('Please select at least one artist.');
            return;
        }
        const selectedArtistNames = Array.from(selectedArtistsData.values())
            .map(artist => artist.name);
        console.log('Selected artists:', selectedArtistNames);
        
        setShowMoodSelection(true);
        setSearchQuery('');
        setArtists([]);
    };

    const MoodSelection = () => {
        const [selectedMood, setSelectedMood] = useState(null);

        const handleMoodSelect = (mood) => {
            setSelectedMood(mood);
            console.log('Selected mood:', mood);
        };

        const handleMoodSubmit = () => {
            if (!selectedMood) {
                alert('Please select a mood.');
                return;
            }
            console.log('Final mood selection:', selectedMood);
            // Add your logic for what happens after mood submission
        };

        return (
            <div className="mood-selection">
                <div className="back-button" onClick={() => setShowMoodSelection(false)}>
                    <span>←</span>
                </div>
                <h3>Select your current mood</h3>
                <div className="moods-container">
                    <div className="mood-item" onClick={() => handleMoodSelect('Happy')}>Happy</div>
                    <div className="mood-item" onClick={() => handleMoodSelect('Sad')}>Sad</div>
                    <div className="mood-item" onClick={() => handleMoodSelect('Energetic')}>Energetic</div>
                    <div className="mood-item" onClick={() => handleMoodSelect('Calm')}>Calm</div>
                    <div className="mood-item" onClick={() => handleMoodSelect('Motivated')}>Motivated</div>
                    <div className="mood-item" onClick={() => handleMoodSelect('Relaxed')}>Relaxed</div>
                    <div className="mood-item" onClick={() => handleMoodSelect('Focused')}>Focused</div>
                    <div className="mood-item" onClick={() => handleMoodSelect('Angry')}>Angry</div>
                    <div className="mood-item" onClick={() => handleMoodSelect('Fearful')}>Fearful</div>
                    <div className="mood-item" onClick={() => handleMoodSelect('Disgusted')}>Disgusted</div>
                    <div className="mood-item" onClick={() => handleMoodSelect('Surprised')}>Surprised</div>
                    <div className="mood-item" onClick={() => handleMoodSelect('Joyful')}>Joyful</div>
                    <div className="mood-item" onClick={() => handleMoodSelect('Excited')}>Excited</div>
                    <div className="mood-item" onClick={() => handleMoodSelect('Grateful')}>Grateful</div>
                    <div className="mood-item" onClick={() => handleMoodSelect('Proud')}>Proud</div>
                    <div className="mood-item" onClick={() => handleMoodSelect('Stressed')}>Stressed</div>
                    <div className="mood-item" onClick={() => handleMoodSelect('Bored')}>Bored</div>
                    <div className="mood-item" onClick={() => handleMoodSelect('Lonely')}>Lonely</div>
                    <div className="mood-item" onClick={() => handleMoodSelect('Embarrassed')}>Embarrassed</div>
                    <div className="mood-item" onClick={() => handleMoodSelect('Ashamed')}>Ashamed</div>
                    <div className="mood-item" onClick={() => handleMoodSelect('Enthusiastic')}>Enthusiastic</div>
                    <div className="mood-item" onClick={() => handleMoodSelect('Hopeful')}>Hopeful</div>
                    <div className="mood-item" onClick={() => handleMoodSelect('Elated')}>Elated</div>
                    <div className="mood-item" onClick={() => handleMoodSelect('Satisfied')}>Satisfied</div>
                    <div className="mood-item" onClick={() => handleMoodSelect('Anxious')}>Anxious</div>
                    <div className="mood-item" onClick={() => handleMoodSelect('Frustrated')}>Frustrated</div>
                    <div className="mood-item" onClick={() => handleMoodSelect('Jealous')}>Jealous</div>
                    <div className="mood-item" onClick={() => handleMoodSelect('Guilty')}>Guilty</div>
                    <div className="mood-item" onClick={() => handleMoodSelect('Envious')}>Envious</div>
                    <div className="mood-item" onClick={() => handleMoodSelect('Insecure')}>Insecure</div>
                    <div className="mood-item" onClick={() => handleMoodSelect('Overwhelmed')}>Overwhelmed</div>
                    <div className="mood-item" onClick={() => handleMoodSelect('Depressed')}>Depressed</div>
                    <div className="mood-item" onClick={() => handleMoodSelect('Hopeless')}>Hopeless</div>
                    <div className="mood-item" onClick={() => handleMoodSelect('Resentful')}>Resentful</div>
                    <div className="mood-item" onClick={() => handleMoodSelect('Bitter')}>Bitter</div>
                    <div className="mood-item" onClick={() => handleMoodSelect('Nostalgic')}>Nostalgic</div>
                    <div className="mood-item" onClick={() => handleMoodSelect('Melancholic')}>Melancholic</div>
                    <div className="mood-item" onClick={() => handleMoodSelect('Bittersweet')}>Bittersweet</div>
                    <div className="mood-item" onClick={() => handleMoodSelect('Ambivalent')}>Ambivalent</div>
                    <div className="mood-item" onClick={() => handleMoodSelect('Conflicted')}>Conflicted</div>
                    <div className="mood-item" onClick={() => handleMoodSelect('Rejected')}>Rejected</div>
                    <div className="mood-item" onClick={() => handleMoodSelect('Confused')}>Confused</div>
                    <div className="mood-item" onClick={() => handleMoodSelect('Tired')}>Tired</div>

                </div>
                <div className="bottom-container">
                    <div className="selected-count">
                        Selected: {selectedMood || 'No mood selected'}
                    </div>
                    <button className="submit-button" onClick={handleMoodSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="playlist-generator">
            {!showMoodSelection ? (
                <>
                    <h3>Select your favorite artists</h3>
                    <div className="search-container">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search for artists..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="artists-container">
                        {artists.map((artist) => (
                            <div 
                                key={artist.id} 
                                className={`artist-circle ${selectedArtists.has(artist.id) ? 'selected' : ''}`}
                                onClick={() => handleArtistClick(artist)}
                            >
                                {artist.imageUrl ? (
                                    <img src={artist.imageUrl} alt={artist.name} />
                                ) : (
                                    <div className="placeholder-image"></div>
                                )}
                                <p>{artist.name}</p>
                            </div>
                        ))}
                    </div>
                    <div className="bottom-container">
                        <div className="selected-count">
                            Selected: {selectedArtists.size} artists
                        </div>
                        <button className="submit-button" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </>
            ) : (
                <MoodSelection />
            )}
        </div>
    );
};

export default PlaylistGenerator;
