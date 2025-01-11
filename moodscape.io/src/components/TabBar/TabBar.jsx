import React from 'react';
import './TabBar.css';

const TabBar = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // Adjust this value based on your header height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="tabBarContainer">
      <div className="logo">MoodScape</div>
      <nav className="tabBar">
        <div className="tabList">
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('home-section'); }}>Home</a>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('features-section'); }}>Features</a>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('download-section'); }}>Download</a>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('contact-section'); }}>Contact</a>
        </div>
      </nav>
    </div>
  );
};

export default TabBar;