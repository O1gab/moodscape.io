import React, { useState } from 'react';

function FAQ() {
  const [openAnswer, setOpenAnswer] = useState(null); // State to track which answer is open

  // Function to toggle answers
  const toggleAnswer = (id) => {
    setOpenAnswer(openAnswer === id ? null : id); // Toggle the answer open/closed
  };

  return (
    <section className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-container">
        {/* FAQ Item 1 */}
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
                <p>Since MoodScape utilizes the Spotify API, the app is currently undergoing moderation by Spotify. We anticipate launching around mid-October. Thank you for your patience!</p>
            </div>
            )}
        </div>

        {/* FAQ Item 2 */}
        <div className="faq-item">
          <button 
            className="faq-question" 
            onClick={() => toggleAnswer(2)} 
            aria-expanded={openAnswer === 2}
          >
            How does MoodScape create playlists?
          </button>
          {openAnswer === 2 && (
            <div className="faq-answer">
              <p>MoodScape employs an AI-driven algorithm to create personalized playlists tailored to your selected emotions. Once your playlist is generated, it will be available for you to view on Spotify.</p>
            </div>
          )}
        </div>

       {/* FAQ Item 3 */}
        <div className="faq-item">
          <button 
            className="faq-question" 
            onClick={() => toggleAnswer(3)} 
            aria-expanded={openAnswer === 3}
          >
            Is MoodScape free?
          </button>
          {openAnswer === 3 && (
            <div className="faq-answer">
              <p>Yes, you can use MoodScape and generate as many playlists as you want absolutely for free.</p>
            </div>
                  )}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
